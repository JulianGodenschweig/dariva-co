import type { MetadataRoute } from "next";

const SITE = "https://www.dariva.co";

export const dynamic = "force-static";

/**
 * The github.io preview build must not be crawled — it would compete with the
 * real domain for identical content. Only the production target opens up.
 */
const isProduction = process.env.DEPLOY_TARGET === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
