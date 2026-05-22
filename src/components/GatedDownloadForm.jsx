"use client";

import { useEffect, useState } from "react";
import { isValidEmail, submitGatedDownloadForm } from "@/lib/web3forms";
import {
  hasGatedUnlock,
  setGatedUnlock,
  triggerResourceDownload,
} from "@/lib/gatedResources";

/**
 * Email gate → Web3Forms lead → optional browser download.
 * @param {{
 *   slug: string;
 *   title: string;
 *   downloadUrl?: string;
 *   downloadFilename?: string;
 *   pageSource?: string;
 *   buttonLabel?: string;
 *   emailPrompt?: string;
 *   successTitle?: string;
 *   successMessage?: (email: string) => string;
 *   onUnlocked?: () => void;
 * }} props
 */
export default function GatedDownloadForm({
  slug,
  title,
  downloadUrl = "",
  downloadFilename,
  pageSource,
  buttonLabel = "Download Free Guide →",
  emailPrompt = "Enter your work email for instant access",
  successTitle,
  successMessage,
  onUnlocked,
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasGatedUnlock(slug)) setDone(true);
  }, [slug]);

  const hasDownload = Boolean(downloadUrl?.trim());

  const startDownload = () => {
    if (!hasDownload) return;
    triggerResourceDownload({ url: downloadUrl, filename: downloadFilename });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await submitGatedDownloadForm({
        email: trimmed,
        resourceTitle: title,
        resourceSlug: slug,
        downloadUrl: hasDownload ? downloadUrl : undefined,
        pageSource,
      });
      setGatedUnlock(slug);
      if (hasDownload) startDownload();
      setDone(true);
      onUnlocked?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resolvedSuccessTitle =
    successTitle ?? (hasDownload ? "Your download has started" : "You're all set!");
  const resolvedSuccessMessage =
    successMessage?.(email.trim()) ??
    (hasDownload
      ? "If it didn't open automatically, use the button below."
      : `We'll send the resource to ${email.trim()}.`);

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#34D399",
            fontFamily: "var(--fb)",
            marginBottom: 8,
          }}
        >
          {resolvedSuccessTitle}
        </div>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,.45)",
            fontFamily: "var(--fb)",
            marginBottom: hasDownload ? 20 : 0,
          }}
        >
          {resolvedSuccessMessage}
        </p>
        {hasDownload ? (
          <button
            type="button"
            onClick={startDownload}
            style={{
              width: "100%",
              background: "rgba(255,255,255,.1)",
              border: "1.5px solid rgba(255,255,255,.2)",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "var(--fb)",
            }}
          >
            Download again →
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255,255,255,.5)",
          fontFamily: "var(--fb)",
          marginBottom: 20,
          letterSpacing: "-.01em",
        }}
      >
        {emailPrompt}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          autoComplete="email"
          disabled={loading}
          style={{
            width: "100%",
            background: "rgba(255,255,255,.08)",
            border: "1.5px solid rgba(255,255,255,.16)",
            borderRadius: 10,
            outline: "none",
            padding: "13px 16px",
            fontSize: 15,
            color: "#fff",
            fontFamily: "var(--fb)",
          }}
        />
        {error ? (
          <p style={{ fontSize: 13, color: "#FCA5A5", margin: 0, fontFamily: "var(--fb)" }}>
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#E8920A,#F5B020)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "13px 24px",
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            fontFamily: "var(--fb)",
            opacity: loading ? 0.75 : 1,
            boxShadow: "0 6px 24px rgba(232,150,10,.45)",
          }}
        >
          {loading ? "Sending…" : buttonLabel}
        </button>
      </div>
      <p
        style={{
          fontSize: 11.5,
          color: "rgba(255,255,255,.22)",
          marginTop: 14,
          fontFamily: "var(--fb)",
          textAlign: "center",
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
