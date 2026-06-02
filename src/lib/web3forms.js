import { postToWeb3FormsJson } from "@/lib/web3formsSubmit";

/**
 * Web3Forms access keys. These are PUBLIC by design — they're inlined into the
 * client bundle so the browser can POST directly to Web3Forms. The env vars are
 * the source of truth, but we fall back to the known public keys so the forms
 * keep working even if NEXT_PUBLIC_WEB3FORMS_* aren't set in the deploy
 * environment (e.g. missing in Vercel Production). Override via env per-env.
 */
const FALLBACK_GET_STARTED_KEY = "18ab8881-fdca-499b-b59c-56a95e1d0709";
const FALLBACK_BOOK_DEMO_KEY = "2d825cc0-cc85-4be9-9966-957015fa1aa2";

const GET_STARTED_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || FALLBACK_GET_STARTED_KEY;
const BOOK_DEMO_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_DEMO_ACCESS_KEY || FALLBACK_BOOK_DEMO_KEY;
const GATED_DOWNLOAD_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_GATED_ACCESS_KEY || GET_STARTED_KEY;

/**
 * Submit Get Started lead (browser → Web3Forms).
 * @param {{ name: string, email: string, phone: string, designation?: string, company?: string }} payload
 */
export async function submitGetStartedForm(payload) {
  return postToWeb3FormsJson({
    access_key: GET_STARTED_KEY,
    subject: "NimbleS2P — Get Started lead",
    from_name: payload.name,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    ...(payload.designation ? { designation: payload.designation } : {}),
    ...(payload.company ? { company: payload.company } : {}),
  });
}

/**
 * Submit Book a Demo request (browser → Web3Forms).
 */
export async function submitBookDemoForm(form) {
  const fullName = `${form.firstName} ${form.lastName}`.trim();
  return postToWeb3FormsJson({
    access_key: BOOK_DEMO_KEY,
    subject: `Demo Request — ${form.company} (${form.industry})`,
    from_name: fullName,
    name: fullName,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone || "—",
    company: form.company,
    title: form.title,
    employees: form.employees,
    industry: form.industry,
    modules: form.modules?.length ? form.modules.join(", ") : "—",
    challenge: form.challenge || "—",
    timeline: form.timeline,
    message: form.message || "—",
  });
}

/**
 * Gated guide / PDF download — full lead form then client may trigger file download.
 * @param {{
 *   name: string;
 *   email: string;
 *   designation: string;
 *   company: string;
 *   phone: string;
 *   countryCode?: string;
 *   resourceTitle: string;
 *   resourceSlug: string;
 *   downloadUrl?: string;
 *   pageSource?: string;
 *   accessKey?: string;
 * }} payload
 */
export async function submitGatedDownloadForm(payload) {
  const access_key = payload.accessKey ?? GATED_DOWNLOAD_KEY;
  return postToWeb3FormsJson({
    access_key,
    subject: `Gated resource — ${payload.resourceTitle}`,
    from_name: payload.name || payload.email,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    designation: payload.designation,
    company: payload.company,
    ...(payload.countryCode ? { country_code: payload.countryCode } : {}),
    resource_title: payload.resourceTitle,
    resource_slug: payload.resourceSlug,
    ...(payload.pageSource ? { page_source: payload.pageSource } : {}),
    ...(payload.downloadUrl ? { download_url: payload.downloadUrl } : {}),
    message: `Resource requested: ${payload.resourceTitle} (${payload.resourceSlug})${
      payload.pageSource ? ` — ${payload.pageSource}` : ""
    }`,
  });
}

/** Basic email format check for gated forms. */
export function isValidEmail(value) {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
