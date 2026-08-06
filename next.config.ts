import type { NextConfig } from "next";

// GitHub Pages serves this repo from https://<user>.github.io/dariva-co/, so the
// build needs a base path. Netlify / the dariva.co domain serve from the root,
// so only opt in when the Pages workflow sets GITHUB_PAGES=true.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/dariva-co" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Emit about/index.html instead of about.html so Pages resolves every route.
  trailingSlash: isGithubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  }
};

export default nextConfig;
