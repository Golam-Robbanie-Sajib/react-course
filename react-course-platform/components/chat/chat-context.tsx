"use client"

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"

export interface ChatPageContext {
  pageTitle?: string
  courseTitle?: string
  dayTitle?: string
  exerciseTitle?: string
  exercisePrompt?: string
  /** A getter that reads the user's current code, called fresh on each send. */
  getUserCode?: () => string
  starterCode?: string
  language?: string
}

interface ChatContextValue {
  /** Replace the chat context for the current page. */
  setContext: (next: ChatPageContext) => void
  /** Build a snapshot of the current context (calls getUserCode if set). */
  snapshot: () => Omit<ChatPageContext, "getUserCode"> & { userCode?: string }
  /** Open the chat dialog programmatically (e.g. "Ask AI" buttons). */
  open: () => void
  /** Wire the open trigger from the bubble. */
  registerOpenHandler: (fn: () => void) => () => void
}

const ChatCtx = createContext<ChatContextValue | undefined>(undefined)

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<ChatPageContext>({})
  const openHandlerRef = useRef<(() => void) | null>(null)

  const setContext = useCallback((next: ChatPageContext) => {
    setCtx(next)
  }, [])

  const snapshot = useCallback(() => {
    const { getUserCode, ...rest } = ctx
    return {
      ...rest,
      userCode: getUserCode ? getUserCode() : undefined,
    }
  }, [ctx])

  const open = useCallback(() => {
    openHandlerRef.current?.()
  }, [])

  const registerOpenHandler = useCallback((fn: () => void) => {
    openHandlerRef.current = fn
    return () => {
      if (openHandlerRef.current === fn) openHandlerRef.current = null
    }
  }, [])

  const value = useMemo<ChatContextValue>(
    () => ({ setContext, snapshot, open, registerOpenHandler }),
    [setContext, snapshot, open, registerOpenHandler]
  )

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>
}

export function useChatContext() {
  const ctx = useContext(ChatCtx)
  if (!ctx) throw new Error("useChatContext must be used inside <ChatContextProvider>")
  return ctx
}
