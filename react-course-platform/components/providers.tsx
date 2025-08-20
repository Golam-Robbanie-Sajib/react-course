// filepath: components/providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"

// Create the client INSTANCE OUTSIDE the component.
// This is the most critical change. It ensures the client is created only ONCE.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false, // Prevents unexpected refetches
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  // The component now ONLY provides this stable, pre-created client.
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}