import type { NextConfig } from "next";

/**
 * Three deploy targets. They vary on two independent axes — where the site is
 * mounted, and whether search engines should index it — so they are resolved
 * separately rather than from one boolean.
 *
 *   preview    → https://juliangodenschweig.github.io/dariva-co/
 *                A GitHub project page lives in a subdirectory, so every asset
 *                URL needs the /dariva-co prefix or the whole site 404s.
 *                Not indexed: it would compete with the real domain.
 *
 *   vercel     → a temporary *.vercel.app URL
 *                Served from the root, so no prefix. Still not indexed — it is
 *                a stand-in for sharing, not the canonical site.
 *
 *   production → https://www.dariva.co
 *                Root, no prefix, and the only target crawlers may index.
 */
type DeployTarget = "preview" | "vercel" | "production";

function resolveTarget(): DeployTarget {
  const explicit = process.env.DEPLOY_TARGET as DeployTarget | undefined;
  if (explicit) return explicit;

  // Vercel sets VERCEL=1 in every build. Without this, a Vercel build would
  // fall through to the GitHub Pages default and prefix every asset with
  // /dariva-co at a domain that serves from the root — a fully broken site.
  if (process.env.VERCEL) return "vercel";

  return "preview";
}

const target = resolveTarget();

// Only the GitHub project page is mounted in a subdirectory.
const basePath = target === "preview" ? "/dariva-co" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Exposed to client components so <img src> and fetches can build correct
  // URLs under either target.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
