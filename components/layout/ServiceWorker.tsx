"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker.
 *
 * Registration is deferred to the `load` event so it never competes with the
 * first render for bandwidth — the visitor sees the page first, and offline
 * support arrives quietly afterwards.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const scope = `${basePath}/`;

    const register = () => {
      navigator.serviceWorker.register(`${basePath}/sw.js`, { scope }).catch(() => {
        // An unavailable service worker is not a broken site — the network
        // path still works. Nothing to surface to the visitor.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
