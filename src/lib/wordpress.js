import { cache } from "react";
import { unstable_cache } from "next/cache";
import { buildMegaMenuFeaturedMap } from "@/lib/megaMenuFromWordPress";
import { extractGatedResourceMeta } from "@/lib/gatedResources";

/**
 * WordPress → Resources adapter.
 *
 * Pulls live posts from the NimbleS2P WordPress REST API and maps each post
 * into the existing ResourcePost shape consumed by <ResourcesPage> /
 * <ResourceCard> / <FeaturedCard>:
 *
 *   { id, title, excerpt, category, readTime, date, slug, coverImage, coverAlt, author }
 *
 * The WP REST API serves permissive CORS headers (it echoes the request
 * Origin), so this runs safely from the browser — no server proxy required.
 * Endpoint: https://nimbles2p.com/wp-json/wp/v2/posts?_embed
 */

/** Override via NEXT_PUBLIC_WORDPRESS_API_URL (e.g. https://yoursite.com/wp-json/wp/v2) */
const WP_API_ROOT = (
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/$/, "") ||
  "https://nimbles2p.com/wp-json/wp/v2"
);
const WP_ENDPOINT = `${WP_API_ROOT}/posts`;

const EMPTY_RESOURCES = { featuredPost: null, posts: [] };

/** WP category slug → existing Resources taxonomy label (keeps the filter pills + #blog deep-link working). */
const CATEGORY_MAP = {
  blogs: "Blog",
};

/** Named HTML entities WP commonly returns in rendered title/excerpt fields. */
const NAMED_ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&apos;": "'", "&nbsp;": " ", "&hellip;": "…",
  "&ndash;": "–", "&mdash;": "—", "&rsquo;": "’", "&lsquo;": "‘",
  "&ldquo;": "“", "&rdquo;": "”",
};

/** Decode numeric (&#8217; / &#x2019;) and common named HTML entities. */
function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (m, n) => { try { return String.fromCodePoint(Number(n)); } catch { return m; } })
    .replace(/&#x([0-9a-f]+);/gi, (m, n) => { try { return String.fromCodePoint(parseInt(n, 16)); } catch { return m; } })
    .replace(/&[a-z]+;/gi, (m) => NAMED_ENTITIES[m.toLowerCase()] ?? m);
}

/** Strip HTML tags + decode entities + collapse whitespace from a WP "rendered" string. */
function cleanText(html = "") {
  const noTags = String(html).replace(/<\/?[^>]+>/g, " ");
  return decodeEntities(noTags).replace(/\s+/g, " ").trim();
}

/** Build a card-sized plain-text excerpt from WP excerpt.rendered (falls back to content). */
function buildExcerpt(excerptHtml, contentHtml) {
  let text = cleanText(excerptHtml)
    .replace(/\s*\[(?:…|\.\.\.|&hellip;)\]\s*$/i, "")        // trailing "[…]"
    .replace(/\s*(?:Continue reading|Read More).*$/i, "")     // trailing CTA
    .trim();
  if (!text) text = cleanText(contentHtml);
  if (text.length > 200) text = `${text.slice(0, 197).trimEnd()}…`;
  return text;
}

/** Rough read-time from the article body word count (~200 wpm). */
function estimateReadTime(contentHtml) {
  const words = cleanText(contentHtml).split(/\s+/).filter(Boolean).length;
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : "";
}

/** WP ISO date ("2025-02-26T23:28:11") → "Feb 26, 2025" (matches existing card style). */
function formatDate(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Featured image via _embed → { url, alt }. Prefers a mid-size crop, falls back to full. */
function extractImage(post) {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media || media.code) return { url: "", alt: "" };          // missing / not-embeddable
  const sizes = media.media_details?.sizes || {};
  const best =
    sizes.medium_large || sizes.saasland_570x400 || sizes.medium || sizes.full;
  return { url: best?.source_url || media.source_url || "", alt: cleanText(media.alt_text || "") };
}

/** Primary category label via _embed, mapped onto the existing taxonomy. */
function extractCategory(post) {
  const terms = (post?._embedded?.["wp:term"] || []).flat();
  const cat = terms.find((t) => t?.taxonomy === "category");
  if (!cat) return "Blog";
  return CATEGORY_MAP[cat.slug] || cat.name || "Blog";
}

function extractAuthor(post) {
  const author = post?._embedded?.author?.[0];
  return author?.name ? cleanText(author.name) : "NimbleS2P Team";
}

async function readJsonSafely(res, label) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const preview = (await res.text()).replace(/\s+/g, " ").trim().slice(0, 120);
    console.warn(
      `[wordpress] ${label}: expected JSON but received ${contentType || "unknown content type"}${preview ? ` — ${preview}` : ""}`,
    );
    return null;
  }

  try {
    return await res.json();
  } catch (err) {
    console.warn(`[wordpress] ${label}: invalid JSON response`, err);
    return null;
  }
}

/** Map one raw WP post into the ResourcePost card model. */
export function mapPost(post) {
  const { url: coverImage, alt: coverAlt } = extractImage(post);
  const title = cleanText(post.title?.rendered);
  const gated = extractGatedResourceMeta(post);
  return {
    id: String(post.id),
    title,
    excerpt: buildExcerpt(post.excerpt?.rendered, post.content?.rendered),
    category: extractCategory(post),
    readTime: estimateReadTime(post.content?.rendered),
    date: formatDate(post.date),
    slug: `/resources/${post.slug}`, // frontend route → /resources/{slug}
    coverImage,
    coverAlt: coverAlt || title,
    author: extractAuthor(post),
    gated: gated.gated,
    downloadUrl: gated.downloadUrl,
    downloadFilename: gated.downloadFilename,
  };
}

/**
 * Fetch live posts and split them into the shape <ResourcesPage> expects.
 * The newest post becomes the pinned featured card; the rest fill the grid.
 *
 * @returns {Promise<{ featuredPost: object|null, posts: object[] }>}
 */
export async function fetchResources({ perPage = 24, signal } = {}) {
  try {
    const res = await fetch(`${WP_ENDPOINT}?_embed&per_page=${perPage}`, {
      signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[wordpress] fetchResources: HTTP ${res.status} — ${WP_ENDPOINT}`);
      return EMPTY_RESOURCES;
    }

    const raw = await readJsonSafely(res, "fetchResources");
    if (!Array.isArray(raw) || raw.length === 0) return EMPTY_RESOURCES;

    const [featuredPost, ...posts] = raw.map(mapPost);
    return { featuredPost, posts };
  } catch (err) {
    console.warn("[wordpress] fetchResources failed:", err);
    return EMPTY_RESOURCES;
  }
}

/** Dedupe within a single server render. */
export const fetchResourcesCached = cache(() => fetchResources({ perPage: 24 }));

/**
 * Cross-request cache for /resources — avoids refetching WordPress on every client nav.
 * Revalidate hourly; keeps second visit to Resources near-instant.
 */
export async function getResourcesForPage() {
  return unstable_cache(
    () => fetchResources({ perPage: 24 }),
    ["nimbles2p-resources-index"],
    { revalidate: 3600, tags: ["wp-resources"] }
  )();
}

/**
 * Fetch posts and return featured mega-menu resources keyed by product module id.
 * Requires WP meta: nimbles_mega_menu_featured + nimbles_mega_menu_module (see wordpress-plugin/).
 *
 * @returns {Promise<Record<string, object>>}
 */
export async function fetchMegaMenuFeaturedByModule({ perPage = 100, signal } = {}) {
  try {
    const res = await fetch(`${WP_ENDPOINT}?_embed&per_page=${perPage}`, {
      signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[wordpress] fetchMegaMenuFeaturedByModule: HTTP ${res.status}`);
      return {};
    }
    const raw = await readJsonSafely(res, "fetchMegaMenuFeaturedByModule");
    return Array.isArray(raw) ? buildMegaMenuFeaturedMap(raw) : {};
  } catch (err) {
    console.warn("[wordpress] fetchMegaMenuFeaturedByModule failed:", err);
    return {};
  }
}

export async function getMegaMenuFeaturedByModule() {
  return unstable_cache(
    () => fetchMegaMenuFeaturedByModule({ perPage: 100 }),
    ["nimbles2p-mega-menu-featured"],
    { revalidate: 3600, tags: ["wp-mega-menu"] }
  )();
}

/* ══════════════════════════════════════════════════════════
   ARTICLE (detail page) — maps a WP post into the shape that
   <BlogPostPage> expects as its `post` prop.
══════════════════════════════════════════════════════════ */

/** _embed → post_tag names. */
function extractTags(post) {
  const terms = (post?._embedded?.["wp:term"] || []).flat();
  return terms.filter((t) => t?.taxonomy === "post_tag").map((t) => cleanText(t.name));
}

/** WP author → BlogPostPage author shape { name, title, initials }. */
function authorFrom(post) {
  const raw = post?._embedded?.author?.[0]?.name;
  const name = raw
    ? cleanText(raw).replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "NimbleS2P Team";
  const initials =
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "NS";
  return { name, title: "NimbleS2P", initials };
}

/** Lightweight related-post card for the sidebar. */
function mapRelated(post) {
  return {
    slug: post.slug, // bare WP slug → article links to /resources/{slug}
    title: cleanText(post.title?.rendered),
    readTime: estimateReadTime(post.content?.rendered),
    category: extractCategory(post),
  };
}

/** Full WP post → <BlogPostPage> `post` prop. */
function mapArticle(post) {
  const { url: coverImage, alt: coverAlt } = extractImage(post);
  const title = cleanText(post.title?.rendered);
  const gated = extractGatedResourceMeta(post);
  return {
    slug: post.slug,
    title,
    excerpt: buildExcerpt(post.excerpt?.rendered, post.content?.rendered),
    category: extractCategory(post),
    readTime: estimateReadTime(post.content?.rendered),
    publishedAt: post.date,                       // ISO → <time dateTime> + JSON-LD
    publishedAtDisplay: formatDate(post.date),    // "Feb 26, 2025"
    author: authorFrom(post),
    tags: extractTags(post),
    coverImage,                                   // featured image → cover slot
    coverAlt: coverAlt || title,
    content: gated.gated
      ? [{ type: "lead", text: buildExcerpt(post.excerpt?.rendered, post.content?.rendered) }]
      : [{ type: "html", html: post.content?.rendered || "" }],
    relatedPosts: [],                             // filled in by fetchPostBySlug
    gated: gated.gated,
    downloadUrl: gated.downloadUrl,
    downloadFilename: gated.downloadFilename,
  };
}

/**
 * Fetch a single article by slug (+ a couple of related posts) for the
 * /resources/{slug} detail page. Returns the BlogPostPage `post` shape, or
 * null if no post matches. Server-side: cached/revalidated via Next's fetch.
 */
export async function fetchPostBySlug(slug, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${WP_ENDPOINT}?slug=${encodeURIComponent(slug)}&_embed`, {
      signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
  } catch (err) {
    console.warn(`[wordpress] fetchPostBySlug(${slug}) failed:`, err);
    return null;
  }
  if (!res.ok) {
    console.warn(`[wordpress] fetchPostBySlug(${slug}): HTTP ${res.status}`);
    return null;
  }

  const raw = await readJsonSafely(res, `fetchPostBySlug(${slug})`);
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const article = mapArticle(raw[0]);

  try {
    const relRes = await fetch(`${WP_ENDPOINT}?exclude=${raw[0].id}&per_page=2&_embed`, {
      signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (relRes.ok) {
      const relRaw = await readJsonSafely(relRes, `fetchPostBySlug(${slug}) related`);
      if (Array.isArray(relRaw)) article.relatedPosts = relRaw.map(mapRelated);
    }
  } catch {
    /* related reading is best-effort */
  }

  return article;
}

/** All published slugs — for generateStaticParams (SSG prerender). */
export async function fetchAllSlugs() {
  try {
    const res = await fetch(`${WP_ENDPOINT}?per_page=100&_fields=slug`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const raw = await readJsonSafely(res, "fetchAllSlugs");
    return Array.isArray(raw) ? raw.map((p) => p.slug).filter(Boolean) : [];
  } catch (err) {
    console.warn("[wordpress] fetchAllSlugs failed:", err);
    return [];
  }
}
