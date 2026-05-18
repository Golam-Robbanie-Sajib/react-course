"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

/**
 * Client-side defense in depth. The Next.js middleware already redirects
 * anonymous users to /login, but this gate also:
 *  - blocks rendering of protected children before the auth state resolves,
 *  - reactively bounces the user if their session expires mid-session,
 *  - covers any edge case where middleware fails to run (broken matcher,
 *    misconfigured env, edge-runtime issue on Vercel, etc.).
 *
 * /login and /auth/* are excluded so they can render for anonymous users.
 */
const PUBLIC_PREFIXES = ["/login", "/auth"]

function isPublicPath(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isPublic = isPublicPath(pathname)

  useEffect(() => {
    if (isLoading) return
    if (!user && !isPublic) {
      const next = encodeURIComponent(pathname || "/")
      router.replace(`/login?next=${next}`)
    }
  }, [isLoading, user, pathname, isPublic, router])

  // Render public pages immediately.
  if (isPublic) return <>{children}</>

  // While we're still figuring out who the user is, render nothing — avoids
  // a flash of protected content followed by a redirect.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  // If the gate decided to redirect, don't render the children at all.
  if (!user) return null

  return <>{children}</>
}
