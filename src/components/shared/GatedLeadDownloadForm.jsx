"use client";

import { useEffect, useMemo, useState } from "react";
import { LeadFormField, LeadPhoneField } from "@/components/shared/LeadFormFields";
import { getGatedResourceCustomization } from "@/lib/gatedResourceConfig";
import {
  formatPhoneWithCountryCode,
  validateGatedResourceLeadForm,
} from "@/lib/leadFormValidation";
import {
  hasGatedUnlock,
  setGatedUnlock,
  triggerResourceDownload,
} from "@/lib/gatedResources";
import { submitGatedDownloadForm } from "@/lib/web3forms";
import { trackLead } from "@/lib/analytics";

/**
 * Get Started–style gated lead form (full page card or modal).
 * @param {{
 *   slug: string;
 *   title: string;
 *   downloadUrl?: string;
 *   downloadFilename?: string;
 *   pageSource?: string;
 *   isMobile?: boolean;
 *   fieldIdPrefix?: string;
 *   onSubmitted?: () => void;
 * }} props
 */
export default function GatedLeadDownloadForm({
  slug,
  title,
  downloadUrl: downloadUrlProp = "",
  downloadFilename = "",
  pageSource,
  isMobile = false,
  fieldIdPrefix = "",
  onSubmitted,
}) {
  const customization = useMemo(
    () => getGatedResourceCustomization(slug),
    [slug],
  );

  const [downloadUrl, setDownloadUrl] = useState(downloadUrlProp);
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    company: "",
    phone: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const id = (name) => (fieldIdPrefix ? `${fieldIdPrefix}-${name}` : name);

  useEffect(() => {
    setDownloadUrl(downloadUrlProp);
  }, [downloadUrlProp]);

  useEffect(() => {
    if (hasGatedUnlock(slug)) setSubmitted(true);
  }, [slug]);

  const hasDownload = Boolean(downloadUrl?.trim());

  const startDownload = () => {
    if (!hasDownload) return;
    triggerResourceDownload({ url: downloadUrl, filename: downloadFilename });
  };

  const validate = (fields) =>
    validateGatedResourceLeadForm({
      name: fields.name,
      email: fields.email,
      designation: fields.designation,
      company: fields.company,
      phone: fields.phone,
      countryCode: fields.countryCode,
    });

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      designation: true,
      company: true,
      phone: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const phoneFormatted = formatPhoneWithCountryCode(form.countryCode, form.phone);

    setSubmitting(true);
    setSubmitError("");
    try {
      await submitGatedDownloadForm({
        name: form.name.trim(),
        email: form.email.trim(),
        designation: form.designation.trim(),
        company: form.company.trim(),
        phone: phoneFormatted,
        countryCode: form.countryCode,
        resourceTitle: title,
        resourceSlug: slug,
        downloadUrl: hasDownload ? downloadUrl : undefined,
        pageSource: pageSource ?? `Resource: ${title}`,
        accessKey: customization.accessKey,
      });
      setGatedUnlock(slug);
      trackLead("gated_download", { resource_slug: slug });
      if (hasDownload) {
        if (downloadUrl.includes("drive.google.com")) {
          window.location.assign(downloadUrl);
          return;
        }
        startDownload();
      }
      setSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setSubmitError(
        msg.includes("not configured")
          ? "Form is temporarily unavailable. Please email us directly."
          : "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel = customization.submitLabel ?? "Download Resource →";
  const formCardTitle = customization.formCardTitle ?? "Download your copy";

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: isMobile ? "16px 0" : "24px 0" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#059669,#10B981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 32px rgba(16,185,129,.3)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18l7 7L28 10"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontFamily: "var(--fb)",
            fontSize: isMobile ? 20 : 24,
            fontWeight: 900,
            color: "#0F172A",
            letterSpacing: "-.03em",
            marginBottom: 10,
          }}
        >
          {hasDownload ? "Your download is ready" : "You're all set"}
        </div>
        <p
          style={{
            fontFamily: "var(--fb)",
            fontSize: 15,
            color: "#64748B",
            lineHeight: 1.7,
            margin: "0 auto 20px",
            maxWidth: 320,
          }}
        >
          Thanks,{" "}
          <strong style={{ color: "#391085" }}>{form.name.split(" ")[0] || "there"}</strong>.
          {hasDownload
            ? " Your file should open automatically."
            : ` We'll follow up at ${form.email}.`}
        </p>
        {hasDownload ? (
          <button
            type="button"
            onClick={startDownload}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "linear-gradient(135deg,#6320E0,#8B5CF6)",
              border: "none",
              borderRadius: 10,
              padding: "12px 24px",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "var(--fb)",
              boxShadow: "0 6px 24px rgba(99,32,224,.35)",
            }}
          >
            Download again →
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "var(--fb)",
            fontSize: isMobile ? 18 : 21,
            fontWeight: 900,
            color: "#0F172A",
            letterSpacing: "-.03em",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {formCardTitle}
        </div>
        <div style={{ fontFamily: "var(--fb)", fontSize: 13, color: "#94A3B8" }}>
          Fields marked <span style={{ color: "#6320E0" }}>*</span> are required
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <LeadFormField
          id={id("name")}
          label="Full Name"
          placeholder="e.g. Rahul Sharma"
          required
          isMobile={isMobile}
          value={form.name}
          error={errors.name}
          isTouched={touched.name}
          onChange={(v) => handleChange("name", v)}
          onBlur={() => handleBlur("name")}
        />
        <LeadFormField
          id={id("designation")}
          label="Designation"
          placeholder="e.g. VP Procurement"
          required
          isMobile={isMobile}
          value={form.designation}
          error={errors.designation}
          isTouched={touched.designation}
          onChange={(v) => handleChange("designation", v)}
          onBlur={() => handleBlur("designation")}
        />
        <LeadFormField
          id={id("company")}
          label="Company"
          placeholder="e.g. Tata Motors"
          required
          isMobile={isMobile}
          value={form.company}
          error={errors.company}
          isTouched={touched.company}
          onChange={(v) => handleChange("company", v)}
          onBlur={() => handleBlur("company")}
        />
        <LeadFormField
          id={id("email")}
          label="Company Email"
          type="email"
          placeholder="you@company.com"
          required
          isMobile={isMobile}
          value={form.email}
          error={errors.email}
          isTouched={touched.email}
          onChange={(v) => handleChange("email", v)}
          onBlur={() => handleBlur("email")}
        />
        <LeadPhoneField
          countryCode={form.countryCode}
          phone={form.phone}
          error={errors.phone}
          isTouched={touched.phone}
          isMobile={isMobile}
          onCountryChange={(v) => handleChange("countryCode", v)}
          onPhoneChange={(v) => handleChange("phone", v)}
          onBlur={() => handleBlur("phone")}
        />

        {submitError ? (
          <p
            style={{
              fontFamily: "var(--fb)",
              fontSize: 13,
              color: "#EF4444",
              margin: 0,
              textAlign: "center",
            }}
          >
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: 4,
            width: "100%",
            background: submitting
              ? "rgba(99,32,224,.5)"
              : "linear-gradient(135deg,#6320E0,#8B5CF6)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "15px 24px",
            fontSize: 16,
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            fontFamily: "var(--fb)",
            letterSpacing: "-.01em",
            boxShadow: submitting ? "none" : "0 6px 24px rgba(99,32,224,.4)",
          }}
        >
          {submitting ? "Submitting…" : submitLabel}
        </button>

        <p
          style={{
            fontFamily: "var(--fb)",
            fontSize: 11.5,
            color: "#94A3B8",
            textAlign: "center",
            margin: 0,
          }}
        >
          By submitting, you agree to our Privacy Policy. No spam, ever.
        </p>
      </form>
    </>
  );
}
