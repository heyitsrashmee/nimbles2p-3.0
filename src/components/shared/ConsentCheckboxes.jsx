"use client";

/**
 * Reusable consent checkboxes shown below the fields and above the submit
 * button on every form that collects personal information.
 *
 *   1. MANDATORY — privacy consent. The submit button must stay disabled until
 *      this is checked (the parent gates its button on the `consent` value).
 *   2. OPTIONAL — marketing opt-in.
 *
 * The "Privacy Policy" text links to /privacy and opens in a new tab so a
 * partially-filled form isn't lost. Supports a light theme (default, for white
 * form cards) and a dark theme (for forms on dark gradient sections).
 *
 * Controlled: parent owns `consent` / `marketing` state and passes setters.
 */
export default function ConsentCheckboxes({
  consent,
  onConsentChange,
  marketing,
  onMarketingChange,
  dark = false,
  idPrefix = "form",
  showMarketing = true,
  style,
}) {
  const textColor = dark ? "rgba(255,255,255,.72)" : "#475569";
  const linkColor = dark ? "#C4B5FD" : "#6320E0";
  const accent = "#6320E0";

  const row = {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    cursor: "pointer",
    fontFamily: "var(--fb)",
    fontSize: 13,
    lineHeight: 1.55,
    color: textColor,
  };
  const box = {
    width: 17,
    height: 17,
    marginTop: 1,
    flexShrink: 0,
    accentColor: accent,
    cursor: "pointer",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left", ...style }}
    >
      <label htmlFor={`${idPrefix}-consent`} style={row}>
        <input
          id={`${idPrefix}-consent`}
          name="privacy_consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          aria-required="true"
          style={box}
        />
        <span>
          I agree to the{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-id="Privacy Policy (form consent)"
            style={{ color: linkColor, fontWeight: 600, textDecoration: "underline" }}
          >
            Privacy Policy
          </a>{" "}
          and consent to the processing of my personal information in accordance
          with the Privacy Policy.
        </span>
      </label>

      {showMarketing && (
        <label htmlFor={`${idPrefix}-marketing`} style={row}>
          <input
            id={`${idPrefix}-marketing`}
            name="marketing_opt_in"
            type="checkbox"
            checked={marketing}
            onChange={(e) => onMarketingChange(e.target.checked)}
            style={box}
          />
          <span>
            Keep me informed about product updates, webinars, events,
            newsletters, and industry insights from NimbleS2P.
          </span>
        </label>
      )}
    </div>
  );
}
