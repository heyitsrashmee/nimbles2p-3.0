import test from "node:test";
import assert from "node:assert/strict";

import { submitGatedDownloadForm } from "./web3forms";

test("submitGatedDownloadForm uses a per-form access key override", async () => {
  const originalFetch = global.fetch;
  const calls = [];

  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    return {
      ok: true,
      async json() {
        return { success: true };
      },
    };
  };

  try {
    await submitGatedDownloadForm({
      accessKey: "override-key",
      email: "procurement@example.com",
      resourceTitle: "Avoid Compliance Pitfalls",
      resourceSlug: "vdd",
      pageSource: "Supplier Due Diligence",
    });
  } finally {
    global.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.web3forms.com/submit");

  const fields = Object.fromEntries(calls[0].options.body.entries());
  assert.equal(fields.access_key, "override-key");
  assert.equal(fields.email, "procurement@example.com");
  assert.equal(fields.resource_slug, "vdd");
  assert.equal(fields.page_source, "Supplier Due Diligence");
});
