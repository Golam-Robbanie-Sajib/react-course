// Verifies the C course's auto-graded tests are correct by running every
// exercise's reference solution through the same interpreter the browser
// uses, and checking it passes all of its own tests. Also checks that the
// untouched starter code does NOT pass (otherwise the test proves nothing).
//
// Run with:  pnpm verify:c

import { createRequire } from "node:module"
import { cCourse } from "../lib/courses/c.ts"
import { runC, normaliseOutput } from "../lib/c-runner/core.ts"

const require = createRequire(import.meta.url)
const JSCPP = require("JSCPP")

function passes(code: string, t: { stdin?: string; expectedOutput?: string; match?: string }) {
  const r = runC(JSCPP, code, t.stdin ?? "", { maxTimeoutMs: 5000 })
  if (r.error) return { ok: false, got: `[${r.errorKind}] ${r.error}` }
  const got = normaliseOutput(r.stdout)
  const want = normaliseOutput(t.expectedOutput ?? "")
  const ok = t.match === "contains" ? got.includes(want) : got === want
  return { ok, got }
}

let failures = 0
let checked = 0
for (const day of cCourse.days) {
  for (const ex of day.exercises) {
    const tests = (ex.tests ?? []).filter((t) => t.runner === "c-io")
    if (ex.template === "c" && tests.length === 0) {
      console.log(`✗ Day ${day.day} "${ex.title}" has a C editor but no c-io tests`)
      failures++
      continue
    }
    if (tests.length === 0) continue
    const starter = Object.values(ex.starter ?? {})[0] ?? ""
    let starterPassesAll = true
    for (const t of tests) {
      checked++
      const res = passes(ex.solution.code, t)
      if (!res.ok) {
        failures++
        console.log(`✗ Day ${day.day} "${ex.title}" — solution fails: ${t.description}`)
        console.log(`    expected: ${JSON.stringify(t.expectedOutput)}\n    got:      ${JSON.stringify(res.got)}`)
      }
      if (!passes(starter, t).ok) starterPassesAll = false
    }
    if (starterPassesAll && !/Hello, World/.test(starter)) {
      failures++
      console.log(`✗ Day ${day.day} "${ex.title}" — the unmodified starter already passes every test`)
    } else {
      console.log(`✓ Day ${day.day} "${ex.title}" (${tests.length} tests)`)
    }
  }
}
console.log(`\n${checked} tests checked, ${failures} problem(s).`)
process.exit(failures ? 1 : 0)
