import { cache } from "react";

import type {
  ResourceArticleData,
  ResourceArticleResult,
  ResourceCardData,
  ResourceRelatedPost,
  ResourcesIndexData,
  ResourcesIndexResult,
  WpTerm,
  WpcomPost,
} from "./types";

const API_BASE =
  process.env.WORDPRESS_RESOURCES_API_BASE?.replace(/\/$/, "") ||
  "https://public-api.wordpress.com/wp/v2/sites/resourcesnimbles2p.wordpress.com";

const POSTS_ENDPOINT = `${API_BASE}/posts`;
const REVALIDATE_SECONDS = 60;
const FEATURED_TAG_SLUG = "featured";
const DEFAULT_AUTHOR = "NimbleS2P Team";
const fallbackCache = ((fn: Function) => fn) as typeof cache;
const cacheFn = typeof cache === "function" ? cache : fallbackCache;

const CATEGORY_LABELS: Record<string, string> = {
  blogs: "Blog",
  blog: "Blog",
  playbooks: "Playbook",
  playbook: "Playbook",
  guides: "Guide",
  guide: "Guide",
  "guides-whitepapers": "Guide",
  "case-studies": "Case Study",
  "case-study": "Case Study",
  "automation-smiles": "Automation Smile",
  "automation-smile": "Automation Smile",
  whitepapers: "Whitepaper",
  whitepaper: "Whitepaper",
  webinars: "Webinar",
  webinar: "Webinar",
};

const NAMED_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&ndash;": "–",
  "&mdash;": "—",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&ldquo;": "“",
  "&rdquo;": "”",
};

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (match, code) => {
      try {
        return String.fromCodePoint(Number(code));
      } catch {
        return match;
      }
    })
    .replace(/&#x([0-9a-f]+);/gi, (match, code) => {
      try {
        return String.fromCodePoint(Number.parseInt(code, 16));
      } catch {
        return match;
      }
    })
    .replace(/&[a-z]+;/gi, (match) => NAMED_ENTITIES[match.toLowerCase()] ?? match);
}

function repairWpTextArtifacts(value = "", trim = true): string {
  let repaired = String(value)
    .replace(/\u00a0/g, " ")
    .replace(/\b([A-Za-z]+)n\?t\b/g, "$1n't")
    .replace(/\b([A-Za-z]+)\?s\b/g, "$1's")
    .replace(/\b([A-Za-z]+)\?re\b/g, "$1're")
    .replace(/\b([A-Za-z]+)\?ve\b/g, "$1've")
    .replace(/\b([A-Za-z]+)\?ll\b/g, "$1'll")
    .replace(/\b([A-Za-z]+)\?d\b/g, "$1'd")
    .replace(/\b([A-Za-z]+)\?m\b/g, "$1'm")
    .replace(/\s+\?/g, "?")
    .replace(/\?\?+/g, "?")
    .replace(/([.!:;])\?/g, "$1")
    .replace(/(?<=[A-Za-z0-9])\?(?=[A-Za-z])/g, " - ")
    .replace(/\s{2,}/g, " ");

  if (trim) {
    repaired = repaired.trim();
  }

  return repaired;
}

function repairWpHtmlContent(html = ""): string {
  return String(html)
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith("<") ? part : repairWpTextArtifacts(decodeEntities(part), false)))
    .join("");
}

function cleanText(html = ""): string {
  const withoutTags = String(html).replace(/<\/?[^>]+>/g, " ");
  return repairWpTextArtifacts(decodeEntities(withoutTags).replace(/\s+/g, " "));
}

export function extractOgImageUrl(html = ""): string {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match?.[1]) {
      return decodeEntities(match[1]).trim();
    }
  }

  return "";
}

function buildExcerpt(excerptHtml = "", contentHtml = ""): string {
  let text = cleanText(excerptHtml)
    .replace(/\s*\[(?:…|\.\.\.|&hellip;)\]\s*$/i, "")
    .replace(/\s*(?:Continue reading|Read More).*$/i, "")
    .trim();

  if (!text) {
    text = cleanText(contentHtml);
  }

  if (text.length > 200) {
    return `${text.slice(0, 197).trimEnd()}…`;
  }

  return text;
}

function estimateReadTime(contentHtml = ""): string {
  const words = cleanText(contentHtml).split(/\s+/).filter(Boolean).length;
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : "";
}

function formatDate(iso = ""): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

function extractTerms(post: WpcomPost, taxonomy: string): WpTerm[] {
  const groups = post._embedded?.["wp:term"] ?? [];
  return groups.flat().filter((term) => term?.taxonomy === taxonomy);
}

function extractCategory(post: WpcomPost): string {
  const category = extractTerms(post, "category")[0];
  if (!category) return "Blog";

  const slug = category.slug?.toLowerCase() ?? "";
  return CATEGORY_LABELS[slug] || category.name || "Blog";
}

function extractTagSlugs(post: WpcomPost): string[] {
  return extractTerms(post, "post_tag")
    .map((term) => term.slug?.trim().toLowerCase())
    .filter((slug): slug is string => Boolean(slug));
}

function extractAuthorName(post: WpcomPost): string {
  return cleanText(post._embedded?.author?.[0]?.name || DEFAULT_AUTHOR) || DEFAULT_AUTHOR;
}

function buildAuthor(name: string) {
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "NS";

  return {
    name,
    title: "NimbleS2P",
    initials,
  };
}

function extractCoverImage(post: WpcomPost): { url: string; alt: string } {
  const embeddedMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = embeddedMedia?.media_details?.sizes ?? {};
  const preferred =
    sizes.medium_large?.source_url ||
    sizes.large?.source_url ||
    sizes.medium?.source_url ||
    embeddedMedia?.source_url ||
    post.jetpack_featured_media_url ||
    "";

  return {
    url: preferred,
    alt: cleanText(embeddedMedia?.alt_text || post.title?.rendered || ""),
  };
}

function hasFeaturedTag(post: WpcomPost): boolean {
  return extractTagSlugs(post).includes(FEATURED_TAG_SLUG);
}

function toSlugPath(slug: string): string {
  return `/resources/${slug}`;
}

async function readJsonSafely<T>(response: Response, label: string): Promise<T | null> {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const preview = (await response.text()).replace(/\s+/g, " ").trim().slice(0, 120);
    console.warn(
      `[wpcom] ${label}: expected JSON but received ${contentType || "unknown content type"}${preview ? ` — ${preview}` : ""}`,
    );
    return null;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[wpcom] ${label}: invalid JSON response`, error);
    return null;
  }
}

async function fetchPosts(
  searchParams: Record<string, string | number | boolean | undefined>,
  label: string,
): Promise<{ posts: WpcomPost[]; totalPages: number } | null> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined || value === false || value === null) continue;
    params.set(key, String(value));
  }

  const response = await fetch(`${POSTS_ENDPOINT}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`[wpcom] ${label}: HTTP ${response.status}`);
  }

  const posts = await readJsonSafely<WpcomPost[]>(response, label);
  if (!posts) {
    return null;
  }

  return {
    posts,
    totalPages: Number(response.headers.get("x-wp-totalpages") || "1"),
  };
}

const fetchPublicOgImage = cacheFn(async (postUrl: string): Promise<string> => {
  try {
    const response = await fetch(postUrl, {
      headers: { Accept: "text/html,application/xhtml+xml" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return extractOgImageUrl(await response.text());
  } catch (error) {
    console.warn(`[wpcom] fetchPublicOgImage(${postUrl}) failed:`, error);
    return "";
  }
});

async function hydratePostsWithCoverFallback(posts: WpcomPost[]): Promise<WpcomPost[]> {
  return Promise.all(
    posts.map(async (post) => {
      if (extractCoverImage(post).url || !post.link) {
        return post;
      }

      const ogImage = await fetchPublicOgImage(post.link);
      return ogImage
        ? {
            ...post,
            jetpack_featured_media_url: ogImage,
          }
        : post;
    }),
  );
}

export function mapWpcomPostToResourceCard(post: WpcomPost): ResourceCardData {
  const cover = extractCoverImage(post);
  const title = cleanText(post.title?.rendered || "");

  return {
    id: String(post.id),
    title,
    excerpt: buildExcerpt(post.excerpt?.rendered || "", post.content?.rendered || ""),
    category: extractCategory(post),
    readTime: estimateReadTime(post.content?.rendered || ""),
    date: formatDate(post.date),
    slug: toSlugPath(post.slug),
    coverImage: cover.url,
    coverAlt: cover.alt || title,
    author: extractAuthorName(post),
    gated: false,
    downloadUrl: "",
    downloadFilename: "",
  };
}

function mapRelatedPost(post: WpcomPost): ResourceRelatedPost {
  return {
    slug: post.slug,
    title: cleanText(post.title?.rendered || ""),
    readTime: estimateReadTime(post.content?.rendered || ""),
    category: extractCategory(post),
  };
}

export function mapWpcomPostToArticle(
  post: WpcomPost,
  relatedPosts: ResourceRelatedPost[] = [],
): ResourceArticleData {
  const cover = extractCoverImage(post);
  const authorName = extractAuthorName(post);
  const title = cleanText(post.title?.rendered || "");

  return {
    slug: post.slug,
    title,
    excerpt: buildExcerpt(post.excerpt?.rendered || "", post.content?.rendered || ""),
    category: extractCategory(post),
    readTime: estimateReadTime(post.content?.rendered || ""),
    publishedAt: post.date,
    publishedAtDisplay: formatDate(post.date),
    author: buildAuthor(authorName),
    tags: extractTagSlugs(post),
    coverImage: cover.url,
    coverAlt: cover.alt || title,
    content: [{ type: "html", html: repairWpHtmlContent(post.content?.rendered || "") }],
    relatedPosts,
    gated: false,
    downloadUrl: "",
    downloadFilename: "",
  };
}

export function buildResourcesIndex(posts: WpcomPost[]): ResourcesIndexData {
  if (posts.length === 0) {
    return { featuredPost: null, posts: [] };
  }

  const featuredIndex = posts.findIndex(hasFeaturedTag);
  const selectedIndex = featuredIndex >= 0 ? featuredIndex : 0;

  return {
    featuredPost: mapWpcomPostToResourceCard(posts[selectedIndex]),
    posts: posts
      .filter((_, index) => index !== selectedIndex)
      .map((post) => mapWpcomPostToResourceCard(post)),
  };
}

async function fetchRelatedPosts(postId: number): Promise<ResourceRelatedPost[]> {
  try {
    const result = await fetchPosts(
      {
        _embed: true,
        per_page: 2,
        orderby: "date",
        order: "desc",
        exclude: postId,
      },
      `fetchRelatedPosts(${postId})`,
    );

    return result?.posts.map(mapRelatedPost) ?? [];
  } catch (error) {
    console.warn("[wpcom] fetchRelatedPosts failed:", error);
    return [];
  }
}

export const getResourcesIndex = cacheFn(async (): Promise<ResourcesIndexResult> => {
  try {
    const result = await fetchPosts(
      {
        _embed: true,
        per_page: 24,
        orderby: "date",
        order: "desc",
      },
      "getResourcesIndex",
    );

    if (!result || result.posts.length === 0) {
      return { status: "empty", featuredPost: null, posts: [] };
    }

    const posts = await hydratePostsWithCoverFallback(result.posts);

    return {
      status: "success",
      ...buildResourcesIndex(posts),
    };
  } catch (error) {
    console.warn("[wpcom] getResourcesIndex failed:", error);
    return {
      status: "error",
      errorMessage: "Unable to load resources right now. Please refresh or try again shortly.",
      featuredPost: null,
      posts: [],
    };
  }
});

export const getResourceArticleBySlug = cacheFn(
  async (slug: string): Promise<ResourceArticleResult> => {
    try {
      const result = await fetchPosts(
        {
          _embed: true,
          per_page: 1,
          slug,
        },
        `getResourceArticleBySlug(${slug})`,
      );

      if (!result || result.posts.length === 0) {
        return { status: "not_found" };
      }

      const [post] = await hydratePostsWithCoverFallback(result.posts);
      const relatedPosts = await fetchRelatedPosts(post.id);

      return {
        status: "success",
        article: mapWpcomPostToArticle(post, relatedPosts),
      };
    } catch (error) {
      console.warn(`[wpcom] getResourceArticleBySlug(${slug}) failed:`, error);
      return {
        status: "error",
        errorMessage: "Unable to load this resource right now. Please try again shortly.",
      };
    }
  },
);

export async function getAllResourceSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const result = await fetchPosts(
        {
          per_page: 100,
          page,
          _fields: "slug",
        },
        `getAllResourceSlugs(page:${page})`,
      );

      if (!result) break;

      totalPages = result.totalPages;
      slugs.push(
        ...result.posts
          .map((post) => post.slug)
          .filter((slug): slug is string => Boolean(slug)),
      );
      page += 1;
    }
  } catch (error) {
    console.warn("[wpcom] getAllResourceSlugs failed:", error);
  }

  return slugs;
}
