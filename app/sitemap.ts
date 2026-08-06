import type { MetadataRoute } from "next";
import { modules } from "@/lib/content";

const SITE = "https://www.dariva.co";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/programmes", priority: 0.9 },
    { path: "/community-counsellor", priority: 0.9 },
    { path: "/workplace", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/impact", priority: 0.7 },
    { path: "/resources", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  const modulePages = modules.map((module) => ({
    path: `/programmes/${module.slug}`,
    priority: 0.8,
  }));

  return [...routes, ...modulePages].map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
