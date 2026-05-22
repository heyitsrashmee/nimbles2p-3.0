const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const GET_STARTED_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const BOOK_DEMO_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_DEMO_ACCESS_KEY ?? "";

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
