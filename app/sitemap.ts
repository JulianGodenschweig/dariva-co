import type { MetadataRoute } from "next";
import { programmes } from "@/lib/site";

const BASE = "https://www.dariva.co";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/programmes", priority: 0.9 },
    { path: "/business", priority: 0.8 },
    { path: "/community-counsellor", priority: 0.8 },
    { path: "/impact", priority: 0.7 },
    { path: "/resources", priority: 0.7 },
    { path: "/assessment", priority: 0.8 },
    { path: "/partner", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...programmes.map((p) => ({
      url: `${BASE}/programmes/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
