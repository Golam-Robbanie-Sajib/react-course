"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Bump when the cache shape changes incompatibly — old entries are dropped.
const CACHE_VERSION = "v2"
const ONE_DAY = 1000 * 60 * 60 * 24

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: ONE_DAY, // long enough for localStorage rehydrate to be useful
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            retry: (failureCount, error: any) => {
              const status = error?.status ?? error?.code
              if (typeof status === "number" && status >= 400 && status < 500) return false
              return failureCount < 2
            },
          },
          mutations: { retry: 1 },
        },
      })
  )

  // Hydrate + start persisting the cache after the component mounts on the
  // client. SSR/prerender never touches localStorage, but the QueryClient
  // is still provided so client components rendered on the server work.
  useEffect(() => {
    if (typeof window === "undefined") return
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
      key: "slh:query-cache",
      throttleTime: 1000,
    })
    const [unsubscribe] = persistQueryClient({
      queryClient,
      persister,
      maxAge: ONE_DAY,
      buster: CACHE_VERSION,
      dehydrateOptions: {
        shouldDehydrateQuery: (q) => q.state.status === "success",
      },
    })
    return () => {
      unsubscribe?.()
    }
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  )
}
