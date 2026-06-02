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
      name: "Jane Doe",
      email: "procurement@example.com",
      designation: "VP Procurement",
      company: "Example Corp",
      phone: "+91 9876543210",
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
  assert.equal(body.name, "Jane Doe");
  assert.equal(body.email, "procurement@example.com");
  assert.equal(body.designation, "VP Procurement");
  assert.equal(body.resource_slug, "vdd");
  assert.equal(body.page_source, "Supplier Due Diligence");
});
