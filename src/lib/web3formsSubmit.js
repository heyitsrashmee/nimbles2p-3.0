export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * POST to Web3Forms using JSON (works from the browser; server IPs are often blocked by Cloudflare).
 * @param {Record<string, string>} body Must include `access_key`
 */
export async function postToWeb3FormsJson(body) {
  if (!body?.access_key) {
    throw new Error("Web3Forms access key is not configured");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      response.ok
        ? "Invalid response from form service"
        : `Form service unavailable (${response.status})`,
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from form service");
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Submission failed");
  }

  return data;
}
