/* Self-Learn Hub service worker.
 *
 * - Hashed build assets (/_next/static) are immutable → cache-first.
 * - Page navigations → network-first, falling back to the last cached copy
 *   of that page, then to /offline.html. Lessons you've opened stay readable
 *   offline.
 * - Never touches API calls, auth routes, or other origins (Supabase, Groq),
 *   so sign-in and data sync always hit the network.
 */
const VERSION = "v1"
const STATIC_CACHE = `slh-static-${VERSION}`
const PAGE_CACHE = `slh-pages-${VERSION}`
const OFFLINE_URL = "/offline.html"
const MAX_PAGES = 60

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll([OFFLINE_URL, "/icons/icon-192.png"]))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("slh-") && k !== STATIC_CACHE && k !== PAGE_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

async function trimPages() {
  const cache = await caches.open(PAGE_CACHE)
  const keys = await cache.keys()
  for (const req of keys.slice(0, Math.max(0, keys.length - MAX_PAGES))) {
    await cache.delete(req)
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/") || url.pathname === "/login") return

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const hit = await cache.match(req)
        if (hit) return hit
        const res = await fetch(req)
        if (res.ok) cache.put(req, res.clone())
        return res
      })
    )
    return
  }

  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req)
          // Only keep real pages — not auth redirects or errors.
          if (res.ok && !res.redirected && res.type === "basic") {
            const cache = await caches.open(PAGE_CACHE)
            await cache.put(req, res.clone())
            trimPages()
          }
          return res
        } catch {
          const cached = await caches.match(req, { ignoreSearch: true })
          return cached || (await caches.match(OFFLINE_URL)) || Response.error()
        }
      })()
    )
  }
})
