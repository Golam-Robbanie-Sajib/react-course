import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

/**
 * OAuth + magic-link callback. Supabase redirects the user here with a
 * `code` query parameter after they finish signing in with the provider
 * (Google, GitHub, email link, …). We exchange that code for a session
 * server-side so that the auth cookies are set on this domain — the
 * middleware can then read them and let the user through.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") || "/"

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", url.origin))
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin)
    )
  }

  // Only allow internal `next` redirects to avoid open-redirect attacks.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/"
  return NextResponse.redirect(new URL(safeNext, url.origin))
}
