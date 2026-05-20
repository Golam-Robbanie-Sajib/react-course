"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { useChatContext } from "./chat-context"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "Why doesn't my code work?",
  "Give me a hint without spoiling the answer.",
  "Explain this concept again, more simply.",
]

export function ChatBubble() {
  const pathname = usePathname()
  const { snapshot, registerOpenHandler, registerPromptHandler } = useChatContext()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  // Keep a live ref to messages so send() in registerPromptHandler always sees
  // the latest state without re-registering.
  const messagesRef = useRef<ChatMessage[]>([])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => registerOpenHandler(() => setOpen(true)), [registerOpenHandler])

  // Hide entirely on login/auth pages where there's no useful context yet.
  const isPublicPage = pathname === "/login" || pathname.startsWith("/auth/")

  // The mobile prev/next dock only shows on day pages. On other pages we can
  // pull the bubble closer to the bottom so it doesn't float in dead space.
  const isDayPage = /^\/courses\/[^/]+\/day\//.test(pathname)
  const bubbleBottom = isDayPage
    ? "calc(env(safe-area-inset-bottom) + 5.5rem)"
    : "calc(env(safe-area-inset-bottom) + 1rem)"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  // Reset chat when the route changes (different context = different conversation).
  useEffect(() => {
    setMessages([])
    setError(null)
    abortRef.current?.abort()
  }, [pathname])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || streaming) return
      setError(null)
      setInput("")

      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed }
      const assistantId = crypto.randomUUID()
      const baseMessages = messagesRef.current
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ])
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const resp = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...baseMessages, userMsg].map(({ role, content }) => ({ role, content })),
            context: snapshot(),
          }),
          signal: controller.signal,
        })

        if (!resp.ok || !resp.body) {
          const errBody = await resp.json().catch(() => ({}))
          throw new Error(errBody.error || `HTTP ${resp.status}`)
        }

        const reader = resp.body.getReader()
        const decoder = new TextDecoder()
        let acc = ""
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          acc += chunk
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
          )
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Something went wrong")
          setMessages((prev) => prev.filter((m) => m.id !== assistantId))
        }
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [snapshot, streaming]
  )

  // Register handler so other components can openWithPrompt(...) and have
  // the chat auto-send their message.
  useEffect(
    () =>
      registerPromptHandler((prompt) => {
        // Defer the actual send so the state from setOpen settles first.
        setTimeout(() => void send(prompt), 0)
      }),
    [registerPromptHandler, send]
  )

  if (isPublicPage) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void send(input)
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          aria-label="Open AI tutor chat"
          onClick={() => setOpen(true)}
          className="fixed z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow right-3 sm:right-5"
          style={{ bottom: bubbleBottom }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div
          className="fixed z-40 right-0 left-0 sm:left-auto sm:right-5 mx-auto sm:mx-0 w-full sm:w-[min(380px,calc(100vw-2rem))] max-w-[100vw] flex flex-col rounded-t-xl sm:rounded-xl border-t sm:border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
          style={{
            bottom: 0,
            maxHeight: "min(85vh, 720px)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <div>
                <div className="text-sm font-medium">AI Tutor</div>
                <div className="text-xs opacity-80">knows your current lesson &amp; code</div>
              </div>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-950 text-sm"
          >
            {messages.length === 0 && (
              <div className="space-y-3 text-muted-foreground">
                <p className="text-xs">
                  Ask anything about the page you&apos;re on — the AI sees the exercise prompt
                  and your current code.
                </p>
                <div className="space-y-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <ChatMessageBubble
                key={m.id}
                role={m.role}
                content={m.content}
                streaming={streaming && m.role === "assistant" && m === messages[messages.length - 1]}
              />
            ))}

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 px-3 py-2 text-xs text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 p-2 bg-white dark:bg-gray-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={streaming ? "AI is replying…" : "Ask your tutor…"}
              disabled={streaming}
              className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
            <Button type="submit" size="sm" disabled={streaming || !input.trim()}>
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  )
}

function ChatMessageBubble({
  role,
  content,
  streaming,
}: {
  role: "user" | "assistant"
  content: string
  streaming?: boolean
}) {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[85%] rounded-lg bg-blue-600 text-white px-3 py-2 whitespace-pre-wrap">
        {content}
      </div>
    )
  }
  return (
    <div className="mr-auto max-w-[95%] rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2">
      {content.length === 0 && streaming ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <div className="chat-md text-sm leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-2 last:mb-0 space-y-0.5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 last:mb-0 space-y-0.5">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              h1: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>,
              h2: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>,
              h3: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1">{children}</h4>,
              h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1">{children}</h4>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline underline-offset-2"
                >
                  {children}
                </a>
              ),
              code: ({ className, children, ...rest }) => {
                const isInline = !(rest as any).node?.position
                  ? !String(children).includes("\n")
                  : !className?.startsWith("language-")
                if (isInline) {
                  return (
                    <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[0.85em] font-mono break-words">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={`font-mono text-[0.85em] ${className || ""}`}>{children}</code>
                )
              },
              pre: ({ children }) => (
                <pre className="my-2 bg-gray-900 text-gray-100 dark:bg-black/40 rounded-md p-3 overflow-x-auto text-xs">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="text-xs border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-semibold text-left bg-gray-100 dark:bg-gray-700">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 align-top">
                  {children}
                </td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-blue-400 dark:border-blue-600 pl-3 my-2 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-2 border-gray-200 dark:border-gray-700" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
