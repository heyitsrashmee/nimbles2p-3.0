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
  /* Resources */
  "Blog": "resources",
  "Case Studies": "resources",
  "Automation Smiles": "resources",
  "Guides & Whitepapers": "resources",
};

/** Footer labels with no page yet — render as non-navigable placeholders */
export const FOOTER_PLACEHOLDER_LABELS = new Set([
  "Careers",
  "Press & Media",
  "Partners",
  "Trust Center",
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
  ["COMPANY", ["About Us", "Careers", "Press & Media", "Partners", "Contact"]],
  [
    "RESOURCES",
    ["Blog", "Case Studies", "Automation Smiles", "Guides & Whitepapers", "Trust Center"],
  ],
];

/** Footer resources label → URL hash segment on /resources */
export const FOOTER_RESOURCE_HASHES = {
  "Blog": "blog",
  "Case Studies": "case-studies",
  "Automation Smiles": "automation-smiles",
  "Guides & Whitepapers": "guides-whitepapers",
};

/** Hash segment → Resources grid filter label */
export const RESOURCE_HASH_FILTERS = {
  blog: "Blog",
  "case-studies": "Case Study",
  "automation-smiles": "Automation Smile",
  "guides-whitepapers": "Guides & Whitepapers",
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
