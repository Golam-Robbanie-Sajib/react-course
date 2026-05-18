"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export function LoginCard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resolvedTheme } = useTheme()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  const nextPath = searchParams.get("next") || "/"
  const errorMsg = searchParams.get("error")

  useEffect(() => {
    setMounted(true)
  }, [])

  // If the user is already signed in, bounce them to the destination.
  useEffect(() => {
    if (!isLoading && user) {
      const safe = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/"
      router.replace(safe)
    }
  }, [isLoading, user, nextPath, router])

  // Build the OAuth callback URL with the original destination preserved.
  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return undefined
    const cb = new URL("/auth/callback", window.location.origin)
    cb.searchParams.set("next", nextPath.startsWith("/") ? nextPath : "/")
    return cb.toString()
  }, [nextPath])

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl">Welcome to Self-Learn Hub</CardTitle>
        <CardDescription>
          Sign in to start learning HTML and React. Your progress syncs across devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMsg && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {errorMsg.replace(/_/g, " ")}
          </div>
        )}
        {mounted && (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme={resolvedTheme === "dark" ? "dark" : "default"}
            providers={["google", "github"]}
            socialLayout="horizontal"
            redirectTo={redirectTo}
            // The Auth UI defaults are reasonable; we just want the OAuth
            // providers and email + password to route through our callback.
          />
        )}
      </CardContent>
    </Card>
  )
}
