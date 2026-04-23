import { MetadataRoute } from "next";
import { getConfig } from "~lib/config";

export default function robots(): MetadataRoute.Robots {
  const config = getConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.url}/sitemap.xml`,
  };
}
