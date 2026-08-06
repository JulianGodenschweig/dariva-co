import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Installable to a phone home screen. This matters more here than on most
 * sites: a coach in a low-bandwidth area can keep Dariva.co one tap away
 * without re-downloading it, and the service worker keeps it opening offline.
 *
 * start_url and scope must carry the basePath, or an installed app launches
 * at a URL that does not exist on the preview host.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dariva.co — Practical Mental Wellness",
    short_name: "Dariva.co",
    description:
      "Practical mental wellness skills for individuals, businesses and communities across Namibia and Africa.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#0d1b2a",
    theme_color: "#0d1b2a",
    orientation: "portrait-primary",
    categories: ["education", "health", "lifestyle"],
    icons: [
      {
        src: `${basePath}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
