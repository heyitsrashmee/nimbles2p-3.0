import { SITE_URL } from "@/lib/seo";

/** Generates /robots.txt — allows all crawling and points to the sitemap. */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
