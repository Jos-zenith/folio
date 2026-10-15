import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, priority: 1 },
    { url: `${profile.site}/resume`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${profile.site}/work/${p.slug}`, priority: p.featured ? 0.7 : 0.5 })),
  ];
}
