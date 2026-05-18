"use client"

import type React from "react"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function Providers({ children }: { children: React.ReactNode }) {
  // One stable client per browser session.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min — course content & profile rarely change
            gcTime: 1000 * 60 * 30, // keep cached data 30 min
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            retry: (failureCount, error: any) => {
              // Don't retry 4xx; do retry transient network errors up to 2x.
              const status = error?.status ?? error?.code
              if (typeof status === "number" && status >= 400 && status < 500) return false
              return failureCount < 2
            },
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  )
}
