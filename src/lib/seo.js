/**
 * Centralised SEO config: canonical host + per-route metadata.
 *
 * The marketing site renders every route through the client catch-all
 * (app/[[...slug]]/page.jsx). Because that page is now a server component,
 * it can call metadataForSlug() to emit unique server-rendered metadata
 * (title / description / canonical / OpenGraph / Twitter) per URL.
 */

/**
 * Canonical, indexable host. The bare domain 301-redirects to www, so www is
 * the host that serves 200 and must be the single canonical base everywhere
 * (sitemap, robots, canonical tags, OpenGraph URLs).
 */
export const SITE_URL = "https://www.nimbles2p.com";

const DEFAULT_TITLE =
  "NimbleS2P — AI-Orchestrated Compliance-First Source-to-Pay Software";
const DEFAULT_DESCRIPTION =
  "NimbleS2P is a compliance-first AI platform for source-to-pay — supplier due diligence, onboarding, RFx, invoice processing, and supplier analytics for the Indian enterprise.";

/** slug → { title, description }. "home" is the index route ("/"). */
export const PAGE_META = {
  home: { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  vdd: {
    title: "Supplier Due Diligence — NimbleS2P",
    description:
      "Real-time, audit-ready supplier due diligence. Automated statutory, financial, and legal risk screening that flags supplier risk before it becomes a breach.",
  },
  supplier: {
    title: "Supplier Portal — NimbleS2P",
    description:
      "Onboard suppliers in days, not weeks. Automated screening, document collection, and risk profiling through a self-service supplier portal integrated with your ERP.",
  },
  invoice: {
    title: "Invoice Processing & AP Automation — NimbleS2P",
    description:
      "Agentic 2-way and 3-way invoice matching for material, service, and non-PO invoices, with enterprise-scale exception management and faster booking turnaround.",
  },
  rfq: {
    title: "RFx Management — NimbleS2P",
    description:
      "Run faster sourcing cycles with an AI follow-up agent that tracks every supplier's response and standardises quote comparison for unbiased, transparent decisions.",
  },
  why: {
    title: "Why NimbleS2P — About Us",
    description:
      "Why enterprises choose NimbleS2P: one hyper-configurable, domain-aware orchestration platform built for supplier-heavy, approval-driven, audit-sensitive operations.",
  },
  pricing: {
    title: "Pricing — NimbleS2P",
    description:
      "Transparent, enterprise-ready pricing for the NimbleS2P source-to-pay platform. Find the plan that fits your supplier, procurement, and finance operations.",
  },
  demo: {
    title: "Book a Demo — NimbleS2P",
    description:
      "See NimbleS2P in action. Book a personalised demo to explore AI-orchestrated supplier due diligence, onboarding, RFx, and invoice processing for your enterprise.",
  },
  analytics: {
    title: "Supplier Analytics & Spend Intelligence — NimbleS2P",
    description:
      "Monitor supplier health, exposure, compliance, and operational performance from one analytics layer — turning procurement data into spend intelligence.",
  },
  finance: {
    title: "Early Financing & Supply Chain Finance — NimbleS2P",
    description:
      "Unlock working capital with early financing and supply chain finance — give suppliers faster access to cash while improving your payment terms and compliance.",
  },
  getstarted: {
    title: "Get Started — NimbleS2P",
    description:
      "Get started with NimbleS2P. Tell us about your source-to-pay challenges and our team will help you go live with AI-orchestrated procurement in weeks.",
  },
  terms: {
    title: "Terms & Conditions — NimbleS2P",
    description:
      "The terms and conditions governing the use of NimbleS2P's website and source-to-pay platform.",
  },
  privacy: {
    title: "Privacy Policy — NimbleS2P",
    description:
      "How NimbleS2P (Techpanion Solutions Private Limited) collects, uses, shares, and protects the personal information of enterprises, suppliers, partners, and website visitors.",
  },
  cookies: {
    title: "Cookie Policy — NimbleS2P",
    description:
      "How NimbleS2P uses cookies and similar technologies — including Google Analytics, Google Tag Manager, and the LinkedIn Insight Tag — and how you can manage your preferences.",
  },
  trust: {
    title: "Trust Center — Security & Compliance — NimbleS2P",
    description:
      "How NimbleS2P keeps enterprise data safe: security, privacy, compliance, and the controls that make our source-to-pay platform audit-ready.",
  },
  press: {
    title: "Press & Media — NimbleS2P",
    description:
      "NimbleS2P in the news. Press coverage, media resources, and the latest announcements about our AI-orchestrated source-to-pay platform.",
  },
  careers: {
    title: "Careers — NimbleS2P",
    description:
      "Join NimbleS2P. Help build the AI-orchestrated source-to-pay platform for the Indian enterprise. Explore open roles across engineering, product, and go-to-market.",
  },
};

/**
 * Marketing slugs that belong in the sitemap (excludes the broken/legacy
 * "blog" route and "resources", which is added explicitly with its children).
 */
export const SITEMAP_SLUGS = [
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
  "privacy",
  "cookies",
  "trust",
  "press",
  "careers",
];

/**
 * Whether a catch-all `slug` param is a real marketing route. Home ([] / undefined)
 * and the single-segment SITEMAP_SLUGS are valid; everything else (unknown slugs,
 * multi-segment paths) is a 404. `/resources` + `/download` have their own routes.
 * @param {string[] | undefined} slug
 */
export function isKnownCatchAllSlug(slug) {
  if (!Array.isArray(slug) || slug.length === 0) return true;
  return slug.length === 1 && SITEMAP_SLUGS.includes(slug[0]);
}

/**
 * Build a Next.js Metadata object for a given first-segment slug.
 * Unknown slugs fall back to the home metadata (they render the homepage).
 * @param {string | undefined} slug
 */
export function metadataForSlug(slug) {
  const key = slug && PAGE_META[slug] ? slug : "home";
  const meta = PAGE_META[key];
  const canonical = key === "home" ? SITE_URL : `${SITE_URL}/${key}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "NimbleS2P",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
