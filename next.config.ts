import type { NextConfig } from "next";

/**
 * Two deploy targets:
 *
 *   preview    → https://juliangodenschweig.github.io/dariva-co/
 *                A project page lives in a subdirectory, so every asset URL
 *                needs the /dariva-co prefix or the whole site 404s.
 *
 *   production → https://www.dariva.co
 *                A custom domain serves from the root, so there must be no
 *                prefix, and a CNAME file must ship in the export.
 *
 * The workflow sets DEPLOY_TARGET. Flip it to "production" once DNS points at
 * GitHub Pages — see .github/workflows/deploy.yml.
 */
const isPreview = process.env.DEPLOY_TARGET !== "production";
const basePath = isPreview ? "/dariva-co" : "";

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
