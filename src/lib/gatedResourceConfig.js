/**
 * Per-resource copy and Web3Forms keys for gated download landing pages.
 * Matched by slug substring (first match wins).
 */

/** @typedef {{
 *   eyebrow?: string;
 *   formCardTitle?: string;
 *   submitLabel?: string;
 *   accessKey?: string;
 *   trustPoints?: [string, string, string][];
 * }} GatedResourceCustomization */

/** @type {Record<string, GatedResourceCustomization>} */
export const GATED_RESOURCE_BY_SLUG_MATCH = {
  "onboarding-mistake": {
    eyebrow: "Free Guide",
    formCardTitle: "Download your guide",
    submitLabel: "Download Guide →",
    accessKey: "dba04989-a460-4c23-95b6-21596b18ba23",
    trustPoints: [
      ["📋", "Practical checklist", "Seven costly onboarding mistakes — and how to avoid them."],
      ["🔒", "Your data is safe", "We never share or sell your information."],
      ["⚡", "Instant access", "Download starts right after you submit the form."],
    ],
  },
  "behind-the-scenes": {
    eyebrow: "Free Case Study",
    formCardTitle: "Download your case study",
    submitLabel: "Download Case Study →",
    accessKey: "ad1286ac-ebf6-4dc5-ace3-812009c9d00a",
    trustPoints: [
      ["📈", "Real outcomes", "See how enterprises transformed supplier experience."],
      ["🔒", "Your data is safe", "We never share or sell your information."],
      ["⚡", "Instant access", "Download starts right after you submit the form."],
    ],
  },
  "early-financing": {
    eyebrow: "Free Guide",
    formCardTitle: "Download your guide",
    submitLabel: "Download Guide →",
    // Dedicated Web3Forms form for the Early Financing download.
    accessKey: "7f0fb486-c13c-413d-8bec-7331332e61e9",
    trustPoints: [
      ["💸", "Faster programs", "Launch scalable supply chain finance with pre-integrated lenders."],
      ["🔒", "Your data is safe", "We never share or sell your information."],
      ["⚡", "Instant access", "Download starts right after you submit the form."],
    ],
  },
  "supplier-analytics": {
    eyebrow: "The Executive Guide",
    formCardTitle: "Download your guide",
    submitLabel: "Download Guide →",
    // Dedicated Web3Forms form for the Supplier Analytics download.
    accessKey: "dc2cc363-8646-4cc7-8d0c-4d4abcba8bb6",
    trustPoints: [
      ["📊", "Metrics by role", "The KPIs that matter to finance, procurement and risk leaders."],
      ["🔒", "Your data is safe", "We never share or sell your information."],
      ["⚡", "Instant access", "Download starts right after you submit the form."],
    ],
  },
};

const DEFAULT_CUSTOMIZATION = {
  eyebrow: "Free Resource",
  formCardTitle: "Download your copy",
  submitLabel: "Download Resource →",
  trustPoints: [
    ["📄", "Expert insight", "Actionable guidance from the NimbleS2P team."],
    ["🔒", "Your data is safe", "We never share or sell your information."],
    ["⚡", "Instant access", "Download starts right after you submit the form."],
  ],
};

/**
 * WordPress resource slugs for product-page “Download Now” CTAs.
 * Slugs must contain the matching key in GATED_RESOURCE_BY_SLUG_MATCH.
 */
export const PRODUCT_GATED_RESOURCE_SLUGS = {
  vdd: "7-onboarding-mistakes",
  supplier: "behind-the-scenes-of-supplier-experience-transformation",
  finance: "early-financing-launch-scalable-scf-programs",
  analytics: "supplier-analytics-by-role",
};

/** Display titles (kept in sync with megaMenuData.js). */
const PRODUCT_GATED_TITLES = {
  vdd: "7 Most Expensive Onboarding Mistakes",
  supplier: "Behind the scenes of supplier experience transformation",
  finance: "Launch Scalable SCF Programs Faster",
  analytics: "Supplier Analytics by Role",
};

/** Google Drive URLs — opened after the visitor submits the gated form. */
export const PRODUCT_GATED_DOWNLOAD_URLS = {
  vdd: "https://drive.google.com/file/d/12mRVqZeB6EzWo750BhhKQWGgcADJevhA/view?usp=sharing",
  supplier:
    "https://drive.google.com/file/d/1iFBmYXs9A03ka7vXKf6vHVYhnYJ-K4QL/view?usp=sharing",
  finance:
    "https://drive.google.com/file/d/1CTctJOWnZNv4fKZfAX3C7uVyTX3N8_ie/view?usp=sharing",
  analytics:
    "https://drive.google.com/file/d/1ROZST5z8VxS9l6koE2yLPy2fCzrc2pcD/view?usp=sharing",
};

const PRODUCT_GATED_EXCERPTS = {
  vdd: "Download our guide to avoid the pitfalls that cost enterprises crores in delayed payments, audit failures, and compliance gaps every year.",
  supplier:
    "Full case study inside — how India's leading enterprises transformed supplier relationships with NimbleS2P.",
  finance:
    "Get your early financing programs live with pre-integrated lenders, automated workflows, and enterprise-grade compliance — all in one platform.",
  analytics:
    "The metrics — and the dashboard — that matter to every leader in the buying group. A guide for finance, procurement and risk leaders.",
};

const VALID_PRODUCT_KEYS = new Set(["vdd", "supplier", "finance", "analytics"]);

/**
 * @param {string} slug
 * @returns {GatedResourceCustomization}
 */
export function getGatedResourceCustomization(slug) {
  const normalized = String(slug || "").toLowerCase();
  for (const [needle, config] of Object.entries(GATED_RESOURCE_BY_SLUG_MATCH)) {
    if (normalized.includes(needle)) {
      return { ...DEFAULT_CUSTOMIZATION, ...config };
    }
  }
  return { ...DEFAULT_CUSTOMIZATION };
}

/** @param {string} productKey */
export function isValidProductGatedKey(productKey) {
  return VALID_PRODUCT_KEYS.has(productKey);
}

/** Dedicated Get Started–style download page (not a modal). */
export function getProductGatedDownloadHref(productKey) {
  return isValidProductGatedKey(productKey) ? `/download/${productKey}` : null;
}

/**
 * Static page payload for /download/[product] (no WordPress required).
 * @param {"vdd"|"supplier"|string} productKey
 */
export function getProductGatedResourcePageData(productKey) {
  if (!isValidProductGatedKey(productKey)) return null;

  const slug = PRODUCT_GATED_RESOURCE_SLUGS[productKey];
  const title = PRODUCT_GATED_TITLES[productKey] ?? slug;
  const customization = getGatedResourceCustomization(slug);

  return {
    slug,
    title,
    excerpt: PRODUCT_GATED_EXCERPTS[productKey] ?? "",
    downloadUrl: PRODUCT_GATED_DOWNLOAD_URLS[productKey] ?? "",
    downloadFilename: "",
    coverImage: "",
    coverAlt: title,
    content: [],
    productKey,
    ...customization,
  };
}

/** @param {string} slug */
export function productKeyForGatedSlug(slug) {
  const normalized = String(slug || "").toLowerCase();
  for (const [key, value] of Object.entries(PRODUCT_GATED_RESOURCE_SLUGS)) {
    if (normalized === value || normalized.includes(value)) return key;
  }
  for (const needle of Object.keys(GATED_RESOURCE_BY_SLUG_MATCH)) {
    if (normalized.includes(needle)) {
      return Object.entries(PRODUCT_GATED_RESOURCE_SLUGS).find(([, s]) =>
        s.includes(needle),
      )?.[0];
    }
  }
  return null;
}

/** @param {"vdd"|"supplier"|string} productKey */
export function getProductGatedResourceInfo(productKey) {
  const slug = PRODUCT_GATED_RESOURCE_SLUGS[productKey];
  if (!slug) return null;

  const title = PRODUCT_GATED_TITLES[productKey] ?? slug;

  return {
    slug,
    title,
    ...getGatedResourceCustomization(slug),
  };
}

/** Slugs that should always use the gated download page (even if WP meta is missing). */
export function isKnownGatedResourceSlug(slug) {
  const normalized = String(slug || "").toLowerCase();
  if (Object.values(PRODUCT_GATED_RESOURCE_SLUGS).some((s) => normalized === s)) {
    return true;
  }
  return Object.keys(GATED_RESOURCE_BY_SLUG_MATCH).some((needle) =>
    normalized.includes(needle),
  );
}
