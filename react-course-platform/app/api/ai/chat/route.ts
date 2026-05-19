import { NextResponse, type NextRequest } from "next/server"

export const runtime = "edge"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatRequestBody {
  messages: ChatMessage[]
  context?: {
    pageTitle?: string
    courseTitle?: string
    dayTitle?: string
    exerciseTitle?: string
    exercisePrompt?: string
    userCode?: string
    starterCode?: string
    language?: string
  }
}

const SYSTEM_PROMPT = `You are a friendly tutor inside the Self-Learn Hub
learning platform. The learner is studying HTML, C, or React. Be concise,
encouraging, and Socratic — prefer guiding hints over giving the full
solution outright. If the learner pastes code, point at the specific line
or change that matters. Format code with markdown code fences. If you spot
a clear bug, name it directly. If something is ambiguous, ask one
clarifying question. Keep replies under 200 words unless the learner asks
for more.`

function buildContextMessage(ctx: ChatRequestBody["context"]): string | null {
  if (!ctx) return null
  const parts: string[] = []
  if (ctx.courseTitle) parts.push(`Course: ${ctx.courseTitle}`)
  if (ctx.dayTitle) parts.push(`Lesson: ${ctx.dayTitle}`)
  if (ctx.pageTitle && !ctx.dayTitle) parts.push(`Page: ${ctx.pageTitle}`)
  if (ctx.exerciseTitle) parts.push(`Exercise: ${ctx.exerciseTitle}`)
  if (ctx.exercisePrompt) parts.push(`Exercise prompt:\n${ctx.exercisePrompt}`)
  if (ctx.userCode && ctx.userCode.trim().length > 0) {
    parts.push(
      `Learner's current code (${ctx.language || "code"}):\n\`\`\`${ctx.language || ""}\n${ctx.userCode}\n\`\`\``
    )
  }
  if (parts.length === 0) return null
  return `[Context for this question — the learner is on this page right now]\n\n${parts.join("\n\n")}`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    )
  }

  let body: ChatRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 })
  }

  // Trim history to last 12 messages to keep context lean.
  const history = body.messages.slice(-12)

  const contextMessage = buildContextMessage(body.context)
  const finalMessages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(contextMessage ? [{ role: "system" as const, content: contextMessage }] : []),
    ...history,
  ]

  const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: finalMessages,
      stream: true,
      temperature: 0.4,
      max_tokens: 1024,
    }),
  })

  if (!groqResp.ok || !groqResp.body) {
    const errText = await groqResp.text().catch(() => "")
    return NextResponse.json(
      { error: `Upstream error: ${groqResp.status} ${errText.slice(0, 200)}` },
      { status: 502 }
    )
  }

  // Re-stream as plain text deltas so the client can read it with TextDecoder.
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqResp.body!.getReader()
      let buffer = ""
      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          let nl: number
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim()
            buffer = buffer.slice(nl + 1)
            if (!line.startsWith("data: ")) continue
            const payload = line.slice(6)
            if (payload === "[DONE]") {
              controller.close()
              return
            }
            try {
              const json = JSON.parse(payload)
              const delta: string | undefined = json.choices?.[0]?.delta?.content
              if (delta) controller.enqueue(encoder.encode(delta))
            } catch {
              // Ignore malformed lines.
            }
          }
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
