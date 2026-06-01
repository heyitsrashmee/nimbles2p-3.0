import test from "node:test";
import assert from "node:assert/strict";

import { submitGatedDownloadToWeb3Forms } from "./web3formsServer.js";

test("submitGatedDownloadToWeb3Forms uses a per-form access key override", async () => {
  const originalFetch = global.fetch;
  const calls = [];

  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    return {
      ok: true,
      headers: { get: (name) => (name === "content-type" ? "application/json" : null) },
      async json() {
        return { success: true };
      },
    };
  };

  try {
    await submitGatedDownloadToWeb3Forms({
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
  assert.equal(calls[0].options.headers["Content-Type"], "application/json");

  const body = JSON.parse(calls[0].options.body);
  assert.equal(body.access_key, "override-key");
  assert.equal(body.email, "procurement@example.com");
  assert.equal(body.resource_slug, "vdd");
  assert.equal(body.page_source, "Supplier Due Diligence");
});
