import { postToWeb3FormsJson } from "@/lib/web3formsSubmit";

/** Server-only keys (set in hosting env). Public fallbacks match project Web3Forms forms. */
const GET_STARTED_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ??
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "18ab8881-fdca-499b-b59c-56a95e1d0709";

const BOOK_DEMO_KEY =
  process.env.WEB3FORMS_DEMO_ACCESS_KEY ??
  process.env.NEXT_PUBLIC_WEB3FORMS_DEMO_ACCESS_KEY ??
  "2d825cc0-cc85-4be9-9966-957015fa1aa2";

const GATED_DOWNLOAD_KEY =
  process.env.WEB3FORMS_GATED_ACCESS_KEY ??
  process.env.NEXT_PUBLIC_WEB3FORMS_GATED_ACCESS_KEY ??
  GET_STARTED_KEY;

export async function submitGetStartedToWeb3Forms(payload) {
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

export async function submitBookDemoToWeb3Forms(form) {
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

export async function submitGatedDownloadToWeb3Forms(payload) {
  const accessKey = payload.accessKey ?? GATED_DOWNLOAD_KEY;
  return postToWeb3FormsJson({
    access_key: accessKey,
    subject: `Gated resource — ${payload.resourceTitle}`,
    from_name: payload.email,
    email: payload.email,
    resource_title: payload.resourceTitle,
    resource_slug: payload.resourceSlug,
    ...(payload.pageSource ? { page_source: payload.pageSource } : {}),
    ...(payload.downloadUrl ? { download_url: payload.downloadUrl } : {}),
    message: `Resource requested: ${payload.resourceTitle} (${payload.resourceSlug})${
      payload.pageSource ? ` — ${payload.pageSource}` : ""
    }`,
  });
}
