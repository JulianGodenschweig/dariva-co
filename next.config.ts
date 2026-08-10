import type { NextConfig } from "next";

// This build is server-rendered on Netlify's Next.js Runtime, not a static
// export. Phase 6's enquiry forms write to Supabase from Server Actions, which
// `output: "export"` cannot run — see BRIEF.md §10.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // three and drei are deep-import heavy; this keeps the WebGL chunk from
    // dragging unused modules along. Budget for that chunk is 220 KB gzipped.
    optimizePackageImports: ["three"],
  },
};

export default nextConfig;
