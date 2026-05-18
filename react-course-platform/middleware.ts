import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Paths that don't require authentication. Everything else is gated.
 * - `/login` itself, otherwise we'd redirect-loop.
 * - `/auth/*` for the OAuth code exchange callback.
 * - Static assets and the favicon are excluded via the matcher below.
 */
const PUBLIC_PATHS = ["/login", "/auth"]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  // getUser() validates the JWT server-side; getSession() only reads the
  // cookie, which can be spoofed. We want the validated version here.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, search } = request.nextUrl

  // Signed-in user visiting /login → bounce them home (or to ?next).
  if (user && pathname === "/login") {
    const next = request.nextUrl.searchParams.get("next") || "/"
    const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/"
    return NextResponse.redirect(new URL(safe, request.url))
  }

  // Anonymous user → block everything except public paths.
  if (!user && !isPublicPath(pathname)) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  // Run on every page except Next.js internals and common static files.
  // The OAuth callback /auth/callback is included so we still refresh
  // cookies through the middleware on that round-trip.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)"],
}
