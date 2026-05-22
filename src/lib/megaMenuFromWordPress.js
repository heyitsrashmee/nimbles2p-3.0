import { mapPost } from "@/lib/wordpress";

/** Product ids in the Products mega menu (must match megaMenuData.js). */
export const MEGA_MENU_MODULE_IDS = [
  "vdd",
  "supplier",
  "invoice",
  "rfq",
  "finance",
  "analytics",
];

const META_FEATURED_KEYS = [
  "nimbles_mega_menu_featured",
  "mega_menu_featured",
  "featured_mega_menu",
];

const META_MODULE_KEYS = [
  "nimbles_mega_menu_module",
  "mega_menu_module",
  "mega_menu_product",
];

/** @param {unknown} value */
function isTruthy(value) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "yes";
}

/** @param {Record<string, unknown>|undefined} meta @param {string[]} keys */
function getMetaValue(meta, keys) {
  if (!meta || typeof meta !== "object") return null;
  for (const key of keys) {
    if (meta[key] !== undefined && meta[key] !== null && meta[key] !== "") {
      return meta[key];
    }
  }
  return null;
}

/** @param {unknown} raw */
function normalizeModuleId(raw) {
  const id = String(raw ?? "").trim().toLowerCase();
  return MEGA_MENU_MODULE_IDS.includes(id) ? id : null;
}

/** Map WP category label → mega menu resource type line. */
function resourceTypeFromCategory(category = "") {
  const c = category.toLowerCase();
  if (c.includes("case")) return "case study";
  if (c.includes("blog")) return "blog";
  if (c.includes("webinar")) return "webinar";
  if (c.includes("whitepaper") || c.includes("guide") || c.includes("playbook")) return "guide";
  if (c.includes("diagnostic")) return "diagnostic";
  return "resource";
}

/** @param {string} type */
function iconForType(type) {
  if (type === "case study") return "📈";
  if (type === "blog") return "✍️";
  if (type === "webinar") return "🎥";
  return "📋";
}

/**
 * Map a WP REST post (with meta + _embed) to the mega menu resource card shape.
 * @param {object} post
 */
export function mapPostToMegaMenuResource(post) {
  const card = mapPost(post);
  const type = resourceTypeFromCategory(card.category);
  return {
    type,
    label: card.title,
    meta: card.readTime,
    icon: iconForType(type),
    slug: card.slug,
    coverImage: card.coverImage,
    coverAlt: card.coverAlt,
  };
}

/**
 * @param {object} post
 * @returns {{ featured: boolean, moduleId: string|null }}
 */
export function extractMegaMenuMeta(post) {
  const meta = post?.meta;
  const featured = isTruthy(getMetaValue(meta, META_FEATURED_KEYS));
  const moduleId = normalizeModuleId(getMetaValue(meta, META_MODULE_KEYS));
  return { featured, moduleId };
}

/**
 * Build { [moduleId]: resource } from WP posts (newest featured post per module wins).
 * @param {object[]} posts
 * @returns {Record<string, object>}
 */
export function buildMegaMenuFeaturedMap(posts) {
  /** @type {Record<string, object>} */
  const byModule = {};

  if (!Array.isArray(posts)) return byModule;

  for (const post of posts) {
    const { featured, moduleId } = extractMegaMenuMeta(post);
    if (!featured || !moduleId || byModule[moduleId]) continue;
    byModule[moduleId] = mapPostToMegaMenuResource(post);
  }

  return byModule;
}
