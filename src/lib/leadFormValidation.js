/** Personal / free email domains blocked for work-email fields. */
export const FREE_EMAIL_DOMAINS = [
  "gmail",
  "yahoo",
  "hotmail",
  "outlook",
  "rediffmail",
  "icloud",
  "aol",
  "protonmail",
  "ymail",
  "live",
  "msn",
  "me",
  "mac",
  "googlemail",
  "yandex",
  "zoho",
];

export function isPersonalEmail(email) {
  const domain = (email.split("@")[1] || "").split(".")[0].toLowerCase();
  return FREE_EMAIL_DOMAINS.includes(domain);
}

/** @type {{ code: string, label: string, digits: number }[]} */
export const PHONE_COUNTRY_CODES = [
  { code: "+91", label: "India (+91)", digits: 10 },
  { code: "+1", label: "US / Canada (+1)", digits: 10 },
  { code: "+44", label: "United Kingdom (+44)", digits: 10 },
  { code: "+971", label: "UAE (+971)", digits: 9 },
  { code: "+65", label: "Singapore (+65)", digits: 8 },
  { code: "+61", label: "Australia (+61)", digits: 9 },
  { code: "+49", label: "Germany (+49)", digits: 10 },
  { code: "+33", label: "France (+33)", digits: 9 },
  { code: "+81", label: "Japan (+81)", digits: 10 },
  { code: "+86", label: "China (+86)", digits: 11 },
];

export function getPhoneRule(countryCode) {
  return PHONE_COUNTRY_CODES.find((c) => c.code === countryCode) ?? PHONE_COUNTRY_CODES[0];
}

/**
 * @param {{ name: string, email: string, phone: string, designation?: string, company?: string, countryCode?: string }} fields
 */
export function validateGatedResourceLeadForm(fields) {
  const e = {};
  if (!fields.name?.trim()) e.name = "Full name is required";

  if (!fields.email?.trim()) {
    e.email = "Company email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    e.email = "Enter a valid email address";
  } else if (isPersonalEmail(fields.email)) {
    e.email = "Please use your professional / work email";
  }

  if (!fields.designation?.trim()) e.designation = "Designation is required";
  if (!fields.company?.trim()) e.company = "Company name is required";

  const rule = getPhoneRule(fields.countryCode || "+91");
  const digits = String(fields.phone || "").replace(/\D/g, "");
  if (!digits) {
    e.phone = "Phone number is required";
  } else if (digits.length !== rule.digits) {
    e.phone = `Enter a valid ${rule.digits}-digit phone number`;
  }

  return e;
}

export function formatPhoneWithCountryCode(countryCode, nationalDigits) {
  const digits = String(nationalDigits).replace(/\D/g, "");
  return `${countryCode || "+91"} ${digits}`.trim();
}
