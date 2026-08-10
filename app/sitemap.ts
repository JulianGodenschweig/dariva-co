import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { modules } from "@/lib/content/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/programmes",
    "/workplace",
    "/community-counsellor",
    "/impact",
    "/partner",
    "/resources",
    "/contact",
    ...modules.map((m) => `/programmes/${m.slug}`),
  ];

  return routes.map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
