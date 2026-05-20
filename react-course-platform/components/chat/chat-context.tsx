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
  /** Open the chat and immediately send a pre-filled user message. */
  openWithPrompt: (prompt: string) => void
  /** Wire the open trigger from the bubble. */
  registerOpenHandler: (fn: () => void) => () => void
  /** Wire the prompt trigger from the bubble. */
  registerPromptHandler: (fn: (prompt: string) => void) => () => void
}

const ChatCtx = createContext<ChatContextValue | undefined>(undefined)

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<ChatPageContext>({})
  const openHandlerRef = useRef<(() => void) | null>(null)
  const promptHandlerRef = useRef<((prompt: string) => void) | null>(null)

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

  const openWithPrompt = useCallback((prompt: string) => {
    openHandlerRef.current?.()
    // Slight defer so the panel mounts before we trigger the send.
    setTimeout(() => promptHandlerRef.current?.(prompt), 60)
  }, [])

  const registerOpenHandler = useCallback((fn: () => void) => {
    openHandlerRef.current = fn
    return () => {
      if (openHandlerRef.current === fn) openHandlerRef.current = null
    }
  }, [])

  const registerPromptHandler = useCallback((fn: (prompt: string) => void) => {
    promptHandlerRef.current = fn
    return () => {
      if (promptHandlerRef.current === fn) promptHandlerRef.current = null
    }
  }, [])

  const value = useMemo<ChatContextValue>(
    () => ({
      setContext,
      snapshot,
      open,
      openWithPrompt,
      registerOpenHandler,
      registerPromptHandler,
    }),
    [setContext, snapshot, open, openWithPrompt, registerOpenHandler, registerPromptHandler]
  )

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>
}

export function useChatContext() {
  const ctx = useContext(ChatCtx)
  if (!ctx) throw new Error("useChatContext must be used inside <ChatContextProvider>")
  return ctx
}
