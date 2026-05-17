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
  "press",
  "resources",
];

const SLUG_SET = new Set(PAGE_SLUGS);

/** Footer label → page slug */
export const FOOTER_LINKS = {
  "Supplier Due Diligence": "vdd",
  "Supplier Portal": "supplier",
  "Invoice Processing": "invoice",
  "RFx Management": "rfq",
  "Supplier Analytics": "analytics",
  "Press & Media": "press",
  "Blog": "resources",
  "Case Studies": "resources",
  "Automation Smiles": "resources",
};

/** @param {string} label */
export function footerLabelToPage(label) {
  return FOOTER_LINKS[label] ?? null;
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
