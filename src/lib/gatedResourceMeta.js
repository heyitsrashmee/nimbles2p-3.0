import {
  isKnownGatedResourceSlug,
  PRODUCT_GATED_DOWNLOAD_URLS,
  productKeyForGatedSlug,
} from "@/lib/gatedResourceConfig";
import { extractGatedResourceMeta } from "@/lib/gatedResources";

const WP_POSTS_ENDPOINT =
  process.env.WORDPRESS_RESOURCES_META_API ??
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  "https://nimbles2p.com/wp-json/wp/v2/posts";

/**
 * Load gated PDF meta from self-hosted WordPress (nimbles2p.com).
 * @param {string} slug
 * @returns {Promise<{ gated: boolean, downloadUrl: string, downloadFilename: string }>}
 */
export async function fetchGatedMetaForSlug(slug) {
  const empty = { gated: false, downloadUrl: "", downloadFilename: "" };
  if (!slug) return empty;

  try {
    const url = `${WP_POSTS_ENDPOINT.replace(/\/$/, "")}?slug=${encodeURIComponent(slug)}&_fields=slug,meta`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return empty;

    const posts = await res.json();
    const post = Array.isArray(posts) ? posts[0] : null;
    if (!post) return empty;

    return extractGatedResourceMeta(post);
  } catch {
    return empty;
  }
}

/**
 * @param {import("@/lib/resources/wpcom/types").ResourceArticleData} article
 */
export async function enrichArticleWithGatedMeta(article) {
  const meta = await fetchGatedMetaForSlug(article.slug);
  const knownGated = isKnownGatedResourceSlug(article.slug);

  if (!knownGated && (!meta.gated || !meta.downloadUrl)) {
    return article;
  }

  const productKey = productKeyForGatedSlug(article.slug);
  const fallbackDownloadUrl = productKey
    ? PRODUCT_GATED_DOWNLOAD_URLS[productKey] ?? ""
    : "";

  return {
    ...article,
    gated: true,
    downloadUrl: meta.downloadUrl || fallbackDownloadUrl,
    downloadFilename: meta.downloadFilename || "",
  };
}
