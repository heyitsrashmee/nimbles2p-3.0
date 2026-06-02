import test from "node:test";
import assert from "node:assert/strict";

import {
  isPersonalEmail,
  validateGatedResourceLeadForm,
} from "./leadFormValidation.js";

test("isPersonalEmail blocks common free providers", () => {
  assert.equal(isPersonalEmail("user@gmail.com"), true);
  assert.equal(isPersonalEmail("user@company.co.in"), false);
});

test("validateGatedResourceLeadForm requires work email and 10-digit India phone", () => {
  const ok = validateGatedResourceLeadForm({
    name: "Jane Doe",
    email: "jane@acme.com",
    designation: "VP Procurement",
    company: "Acme Ltd",
    phone: "9876543210",
    countryCode: "+91",
  });
  assert.deepEqual(ok, {});

  const badEmail = validateGatedResourceLeadForm({
    name: "Jane",
    email: "jane@gmail.com",
    designation: "VP",
    company: "Acme",
    phone: "9876543210",
    countryCode: "+91",
  });
  assert.ok(badEmail.email);

  const badPhone = validateGatedResourceLeadForm({
    name: "Jane",
    email: "jane@acme.com",
    designation: "VP",
    company: "Acme",
    phone: "12345",
    countryCode: "+91",
  });
  assert.ok(badPhone.phone);
});
