import type { MetadataRoute } from "next";
import { portfolio } from "@/data/olafenwa";

const SITE_URL = "https://olafenwa.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...portfolio.projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
