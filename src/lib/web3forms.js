const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const GET_STARTED_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const BOOK_DEMO_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_DEMO_ACCESS_KEY ?? "";
/** Falls back to Get Started form if a dedicated gated key is not set. */
const GATED_DOWNLOAD_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_GATED_ACCESS_KEY ?? GET_STARTED_KEY;

async function submitToWeb3Forms(accessKey, fields) {
  if (!accessKey) {
    throw new Error("Web3Forms access key is not configured");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: fields,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Submission failed");
  }
  return data;
}

/**
 * Submit Get Started lead to Web3Forms.
 * @param {{ name: string, email: string, phone: string, designation?: string, company?: string }} payload
 */
export async function submitGetStartedForm(payload) {
  const formData = new FormData();
  formData.append("access_key", GET_STARTED_KEY);
  formData.append("subject", "NimbleS2P — Get Started lead");
  formData.append("from_name", payload.name);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  if (payload.designation) formData.append("designation", payload.designation);
  if (payload.company) formData.append("company", payload.company);
  return submitToWeb3Forms(GET_STARTED_KEY, formData);
}

/**
 * Submit Book a Demo request to Web3Forms.
 */
export async function submitBookDemoForm(form) {
  const fullName = `${form.firstName} ${form.lastName}`.trim();
  const formData = new FormData();
  formData.append("access_key", BOOK_DEMO_KEY);
  formData.append("subject", `Demo Request — ${form.company} (${form.industry})`);
  formData.append("from_name", fullName);
  formData.append("name", fullName);
  formData.append("firstName", form.firstName);
  formData.append("lastName", form.lastName);
  formData.append("email", form.email);
  formData.append("phone", form.phone || "—");
  formData.append("company", form.company);
  formData.append("title", form.title);
  formData.append("employees", form.employees);
  formData.append("industry", form.industry);
  formData.append("modules", form.modules?.length ? form.modules.join(", ") : "—");
  formData.append("challenge", form.challenge || "—");
  formData.append("timeline", form.timeline);
  formData.append("message", form.message || "—");
  return submitToWeb3Forms(BOOK_DEMO_KEY, formData);
}

/**
 * Gated guide / PDF download — captures email then client may trigger file download.
 * @param {{ email: string, resourceTitle: string, resourceSlug: string, downloadUrl?: string, pageSource?: string, accessKey?: string }} payload
 */
export async function submitGatedDownloadForm(payload) {
  const accessKey = payload.accessKey ?? GATED_DOWNLOAD_KEY;
  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", `Gated resource — ${payload.resourceTitle}`);
  formData.append("from_name", payload.email);
  formData.append("email", payload.email);
  formData.append("resource_title", payload.resourceTitle);
  formData.append("resource_slug", payload.resourceSlug);
  if (payload.pageSource) formData.append("page_source", payload.pageSource);
  if (payload.downloadUrl) formData.append("download_url", payload.downloadUrl);
  formData.append(
    "message",
    `Resource requested: ${payload.resourceTitle} (${payload.resourceSlug})${payload.pageSource ? ` — ${payload.pageSource}` : ""}`,
  );
  return submitToWeb3Forms(accessKey, formData);
}

/** Basic email format check for gated forms. */
export function isValidEmail(value) {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
