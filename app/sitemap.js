import { SITE_URL, SITEMAP_SLUGS } from "@/lib/seo";
import { getAllResourceSlugs } from "@/lib/resources/wpcom/service";

/** Re-generate the sitemap hourly so new WordPress resources are picked up. */
export const revalidate = 3600;

/** Generates /sitemap.xml — static marketing routes + dynamic resource articles. */
export default async function sitemap() {
  const now = new Date();

  const staticEntries = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ...SITEMAP_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/resources`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  let resourceEntries = [];
  try {
    const slugs = await getAllResourceSlugs();
    resourceEntries = slugs.map((slug) => ({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    /* WordPress fetch hiccup at build → ship the static entries only */
  }

  return [...staticEntries, ...resourceEntries];
}
