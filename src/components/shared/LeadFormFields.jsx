"use client";

import { PHONE_COUNTRY_CODES } from "@/lib/leadFormValidation";

export function LeadFormField({
  id,
  label,
  type = "text",
  placeholder,
  required,
  half,
  isMobile,
  value,
  error,
  isTouched,
  onChange,
  onBlur,
}) {
  const hasErr = isTouched && error;
  const isOk = isTouched && !error && value.trim();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        gridColumn: half && !isMobile ? "span 1" : "span 1",
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--fb)",
          fontSize: 13,
          fontWeight: 700,
          color: "#334155",
          letterSpacing: "-.01em",
        }}
      >
        {label} {required && <span style={{ color: "#6320E0" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{
            width: "100%",
            fontFamily: "var(--fb)",
            fontSize: 15,
            color: "#0F172A",
            background: hasErr ? "#FFF5F5" : "#fff",
            border: `1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
            borderRadius: 12,
            padding: "13px 44px 13px 16px",
            outline: "none",
            transition: "border-color .18s, background .18s, box-shadow .18s",
            boxShadow: hasErr
              ? "0 0 0 3px rgba(239,68,68,.1)"
              : isOk
                ? "0 0 0 3px rgba(5,150,105,.08)"
                : "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            if (!hasErr) {
              e.target.style.borderColor = "#6320E0";
              e.target.style.boxShadow = "0 0 0 3px rgba(99,32,224,.1)";
            }
          }}
          onBlurCapture={(e) => {
            if (!hasErr && !isOk) {
              e.target.style.borderColor = "#CBD5E1";
              e.target.style.boxShadow = "none";
            }
          }}
        />
        {isOk && (
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#059669" />
              <path
                d="M5 8l2.5 2.5L11 5.5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {hasErr && (
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#EF4444" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
      {hasErr && (
        <div
          style={{
            fontFamily: "var(--fb)",
            fontSize: 12,
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span>⚠</span> {error}
        </div>
      )}
    </div>
  );
}

export function LeadPhoneField({
  countryCode,
  phone,
  error,
  isTouched,
  isMobile,
  onCountryChange,
  onPhoneChange,
  onBlur,
}) {
  const hasErr = isTouched && error;
  const isOk = isTouched && !error && phone.replace(/\D/g, "").length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: "1 / -1" }}>
      <label
        htmlFor="phone"
        style={{
          fontFamily: "var(--fb)",
          fontSize: 13,
          fontWeight: 700,
          color: "#334155",
          letterSpacing: "-.01em",
        }}
      >
        Phone Number <span style={{ color: "#6320E0" }}>*</span>
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "140px 1fr",
          gap: 10,
        }}
      >
        <select
          id="countryCode"
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          onBlur={onBlur}
          style={{
            width: "100%",
            fontFamily: "var(--fb)",
            fontSize: 14,
            color: "#0F172A",
            background: "#fff",
            border: `1.5px solid ${hasErr ? "#EF4444" : "#CBD5E1"}`,
            borderRadius: 12,
            padding: "13px 12px",
            outline: "none",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        >
          {PHONE_COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <div style={{ position: "relative" }}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 15))}
            onBlur={onBlur}
            placeholder="10-digit mobile number"
            style={{
              width: "100%",
              fontFamily: "var(--fb)",
              fontSize: 15,
              color: "#0F172A",
              background: hasErr ? "#FFF5F5" : "#fff",
              border: `1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
              borderRadius: 12,
              padding: "13px 44px 13px 16px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {isOk && (
            <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#059669" />
                <path
                  d="M5 8l2.5 2.5L11 5.5"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {hasErr && (
        <div style={{ fontFamily: "var(--fb)", fontSize: 12, color: "#EF4444" }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
