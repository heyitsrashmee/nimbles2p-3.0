/** @type {readonly string[]} */
export const PAGE_SLUGS = [
  "vdd",
  "supplier",
  "invoice",
  "rfq",
  "why",
  "pricing",
  "demo",
  "analytics",
  "finance",
  "getstarted",
  "terms",
  "resources",
  "trust",
  "press",
  "careers",
];

const SLUG_SET = new Set(PAGE_SLUGS);

/** Footer label → page slug (only labels with a live page) */
export const FOOTER_LINKS = {
  /* Product */
  "Supplier Due Diligence": "vdd",
  "Supplier Portal": "supplier",
  "Invoice Processing": "invoice",
  "RFx Management": "rfq",
  "Supplier Analytics": "analytics",
  "Early Financing": "finance",
  /* Company */
  "About Us": "why",
  "Pricing": "pricing",
  "Contact": "demo",
  "Get Started": "getstarted",
  "Press & Media": "press",
  "Careers": "careers",
  /* Resources */
  "Blog": "resources",
  "Case Studies": "resources",
  "Automation Smiles": "resources",
  "Guides": "resources",
  "Whitepapers": "resources",
  "Trust Center": "trust",
};

/** Footer labels with no page yet — render as non-navigable placeholders */
export const FOOTER_PLACEHOLDER_LABELS = new Set([
  "Blackbox API",
]);

/** Shared footer column structure (VDDFooter + homepage) */
export const FOOTER_COLUMNS = [
  [
    "PRODUCT",
    [
      "Supplier Due Diligence",
      "Supplier Portal",
      "Invoice Processing",
      "RFx Management",
      "Supplier Analytics",
      "Early Financing",
    ],
  ],
  ["COMPANY", ["About Us", "Careers", "Press & Media", "Contact"]],
  [
    "RESOURCES",
    ["Blog", "Case Studies", "Automation Smiles", "Guides", "Whitepapers", "Trust Center"],
  ],
];

/** Resources grid filter value → URL hash on /resources (e.g. #blog) */
export const RESOURCE_FILTER_HASHES = {
  Blog: "blog",
  Playbook: "playbooks",
  Guide: "guides",
  "Case Study": "case-studies",
  "Automation Smile": "automation-smiles",
  Whitepaper: "whitepapers",
  Webinar: "webinars",
  "Guides & Whitepapers": "guides-whitepapers",
};

/** Hash segment → Resources grid filter value */
export const RESOURCE_HASH_FILTERS = Object.fromEntries(
  Object.entries(RESOURCE_FILTER_HASHES).map(([filter, hash]) => [hash, filter])
);

/** Footer resources label → URL hash segment on /resources */
export const FOOTER_RESOURCE_HASHES = {
  Blog: RESOURCE_FILTER_HASHES.Blog,
  "Case Studies": RESOURCE_FILTER_HASHES["Case Study"],
  "Automation Smiles": RESOURCE_FILTER_HASHES["Automation Smile"],
  Guides: RESOURCE_FILTER_HASHES.Guide,
  Whitepapers: RESOURCE_FILTER_HASHES.Whitepaper,
};

/** @param {string} label */
export function footerLabelToPage(label) {
  return FOOTER_LINKS[label] ?? null;
}

/** @param {string} label */
export function isFooterPlaceholder(label) {
  return FOOTER_PLACEHOLDER_LABELS.has(label);
}

/** @param {string} label */
export function footerHref(label) {
  const page = footerLabelToPage(label);
  if (!page) return null;
  const hash = footerLabelToResourceHash(label);
  const path = pageToPath(page);
  return hash ? `${path}#${hash}` : path;
}

/** @param {string} label */
export function footerLabelToResourceHash(label) {
  return FOOTER_RESOURCE_HASHES[label] ?? null;
}

/** @param {string} hash */
export function resourceHashToFilter(hash) {
  return RESOURCE_HASH_FILTERS[hash] ?? null;
}

/** @param {string} filter — Resources grid category (e.g. "Blog"); "All" yields empty string */
export function resourceFilterToHash(filter) {
  if (!filter || filter === "All") return "";
  return RESOURCE_FILTER_HASHES[filter] ?? "";
}

/** @param {string | null | undefined} pathname */
export function pathToPage(pathname) {
  if (!pathname || pathname === "/") return "home";
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  return SLUG_SET.has(slug) ? slug : "home";
}

/** @param {string} page */
export function pageToPath(page) {
  return page === "home" ? "/" : `/${page}`;
}
