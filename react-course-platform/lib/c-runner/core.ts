// Pure C execution core, shared by the browser Web Worker and the Node
// verification script. Uses JSCPP (a C/C++ interpreter written in JS), with
// a patch applied via pnpm (see patches/JSCPP@2.0.9.patch) so that scanf
// into array elements and %lf / %ld format specifiers behave like real C.

export interface CRunResult {
  stdout: string
  /** Program exit code (return value of main). null when execution failed. */
  exitCode: number | null
  /** Friendly error message for compile/runtime errors, if any. */
  error: string | null
  errorKind: "compile" | "runtime" | "timeout" | null
  durationMs: number
}

// Candidate single-character sentinels. We pick one that does not already
// appear anywhere in the program, so swapping it back is lossless.
const SENTINELS = ["`", "~", "^", "|", "@", "$"]

/**
 * JSCPP's preprocessor tokenises commas and drops any whitespace that follows
 * them — even inside string literals — so `"Hello, World!"` prints as
 * `Hello,World!`. We replace those spaces with a sentinel character of the
 * same length (so strlen() stays correct) and swap it back on output.
 */
export function protectCommaSpaces(source: string): { code: string; sentinel: string | null } {
  const sentinel = SENTINELS.find((c) => !source.includes(c)) ?? null
  if (!sentinel) return { code: source, sentinel: null }
  let touched = false
  const code = source.replace(/"(?:[^"\\\n]|\\.)*"/g, (lit) =>
    lit.replace(/,( +)/g, (_m, spaces: string) => {
      touched = true
      return "," + sentinel.repeat(spaces.length)
    })
  )
  return { code, sentinel: touched ? sentinel : null }
}

/** Normalise JSCPP's error text into something a beginner can act on. */
export function friendlyError(raw: string): { message: string; kind: "compile" | "runtime" | "timeout" } {
  const msg = raw.replace(/^Error:\s*/, "").trim()
  if (/time limit exceeded/i.test(msg)) {
    return {
      kind: "timeout",
      message:
        "Your program ran for too long and was stopped. Check for an infinite loop — does the loop condition ever become false?",
    }
  }
  if (/parsing failure|syntax|expected/i.test(msg)) {
    // JSCPP reports "line:col" in the message body when it can.
    const pos = msg.match(/(\d+):(\d+)/)
    return {
      kind: "compile",
      message:
        `Compile error${pos ? ` near line ${pos[1]}` : ""}: the code could not be parsed. ` +
        "Look for a missing semicolon (;), an unmatched brace { }, or a missing quote.",
    }
  }
  if (/index out of bound/i.test(msg)) {
    return { kind: "runtime", message: `Runtime error: array index out of bounds (${msg}).` }
  }
  if (/uninitialized value/i.test(msg)) {
    return {
      kind: "runtime",
      message: "Runtime error: a variable was printed before being given a value. Initialise it first.",
    }
  }
  if (/NaN|divide|division/i.test(msg)) {
    return { kind: "runtime", message: `Runtime error: ${msg}. Did you divide by zero?` }
  }
  return { kind: "runtime", message: `Error: ${msg}` }
}

type JSCPPModule = {
  run: (
    code: string,
    input: string,
    config: { stdio: { write: (s: string) => void }; maxTimeout?: number; unsigned_overflow?: string }
  ) => number
}

export function runC(
  JSCPP: JSCPPModule,
  source: string,
  stdin: string,
  opts: { maxTimeoutMs?: number; maxOutputChars?: number; onOutput?: (chunk: string) => void } = {}
): CRunResult {
  const maxOutput = opts.maxOutputChars ?? 20_000
  const { code, sentinel } = protectCommaSpaces(source)
  const restore = (s: string) => (sentinel ? s.split(sentinel).join(" ") : s)

  let stdout = ""
  let truncated = false
  const started = Date.now()
  try {
    const exitCode = JSCPP.run(code, stdin, {
      maxTimeout: opts.maxTimeoutMs ?? 3000,
      unsigned_overflow: "warn",
      stdio: {
        write: (s: string) => {
          if (truncated) return
          const chunk = restore(s)
          stdout += chunk
          if (stdout.length > maxOutput) {
            stdout = stdout.slice(0, maxOutput) + "\n… output truncated …"
            truncated = true
          }
          opts.onOutput?.(chunk)
        },
      },
    })
    return { stdout, exitCode, error: null, errorKind: null, durationMs: Date.now() - started }
  } catch (err: unknown) {
    const raw = err instanceof Error ? err.message : String(err)
    const { message, kind } = friendlyError(raw)
    return { stdout, exitCode: null, error: message, errorKind: kind, durationMs: Date.now() - started }
  }
}

/** Compare program output the way an exam grader would: ignore trailing
 *  whitespace on each line and trailing blank lines, keep everything else. */
export function normaliseOutput(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "")
}
