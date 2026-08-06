/**
 * Offline support for Dariva.co.
 *
 * Deliberately conservative. A service worker that caches too eagerly is worse
 * than none: visitors get stale pages and no obvious way to recover. So:
 *   - navigations are network-first, falling back to cache only when offline
 *   - build assets are cache-first, because their URLs are content-hashed
 *   - anything cached under an older version tag is deleted on activate
 *
 * Bump CACHE_VERSION to invalidate every cached response.
 */

const CACHE_VERSION = "dariva-v1";
const SCOPE_PATH = new URL(self.registration.scope).pathname;
const OFFLINE_URL = SCOPE_PATH;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" })))
      // A failed precache must not block installation.
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never touch other origins — Formspree posts and Google Fonts included.
  if (url.origin !== self.location.origin) return;

  // Content-hashed build output: safe to serve from cache indefinitely.
  if (url.pathname.includes("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
            return response;
          }),
      ),
    );
    return;
  }

  // Pages: always prefer the network so content is never stale, and fall back
  // to the cache — then to the home page — only when the network fails.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
            .then(
              (cached) =>
                cached ||
                new Response("You are offline.", {
                  status: 503,
                  headers: { "Content-Type": "text/plain" },
                }),
            ),
        ),
    );
  }
});
