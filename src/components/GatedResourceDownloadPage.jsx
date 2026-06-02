"use client";

import { useEffect, useMemo } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";
import GatedLeadDownloadForm from "@/components/shared/GatedLeadDownloadForm";
import { getGatedResourceCustomization } from "@/lib/gatedResourceConfig";

function useSEOHead(post) {
  useEffect(() => {
    const base = "https://nimbles2p.com";
    document.title = `${post.title} | NimbleS2P`;
    const sm = (n, c, p = false) => {
      const s = p ? `meta[property="${n}"]` : `meta[name="${n}"]`;
      let e = document.querySelector(s);
      if (!e) {
        e = document.createElement("meta");
        if (p) e.setAttribute("property", n);
        else e.setAttribute("name", n);
        document.head.appendChild(e);
      }
      e.setAttribute("content", c);
    };
    sm("description", post.excerpt);
    sm("og:title", post.title, true);
    sm("og:description", post.excerpt, true);
    sm("og:type", "article", true);
    const path = post.productKey
      ? `/download/${post.productKey}`
      : `/resources/${post.slug}`;
    sm("og:url", `${base}${path}`, true);
    if (post.coverImage) sm("og:image", post.coverImage, true);
  }, [post]);
}

/**
 * Gated resource download — Get Started layout, per-resource customization.
 */
export default function GatedResourceDownloadPage({
  post,
  onBack,
  onNavigate,
  backLabel = "Resources",
}) {
  const w = useWidth();
  const isMobile = w < 640;
  useSEOHead(post);

  const customization = useMemo(
    () => getGatedResourceCustomization(post.slug),
    [post.slug],
  );

  const leadText =
    post.content?.find((b) => b.type === "lead")?.text || post.excerpt;

  const trustPoints = customization.trustPoints ?? [];

  const eyebrow = customization.eyebrow ?? "Free Resource";

  return (
    <>
      <style>{`@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}`}</style>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName={backLabel} />
      <main>
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            background: "#F5F3FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "110px 20px 60px" : "128px 5vw 80px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(rgba(99,32,224,.07) 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "-5%",
              width: "45%",
              height: "60%",
              background:
                "radial-gradient(ellipse, rgba(99,32,224,.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              right: "-5%",
              width: "45%",
              height: "60%",
              background:
                "radial-gradient(ellipse, rgba(245,166,35,.06) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: 1040,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 48 : 80,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(99,32,224,.1)",
                  border: "1px solid rgba(99,32,224,.2)",
                  borderRadius: 100,
                  padding: "6px 16px",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#6320E0",
                    display: "inline-block",
                    animation: "pulse-dot 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#391085",
                    fontFamily: "var(--fb)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  {eyebrow}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--fb)",
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1.08,
                  fontSize: isMobile ? "clamp(24px,6.5vw,32px)" : "clamp(26px,2.8vw,38px)",
                  color: "#0A0F1E",
                  marginBottom: 20,
                }}
              >
                {post.title}
              </h1>

              <p
                style={{
                  fontSize: isMobile ? 15 : 17,
                  color: "#475569",
                  lineHeight: 1.78,
                  fontFamily: "var(--fb)",
                  marginBottom: post.coverImage ? 24 : 36,
                  maxWidth: 480,
                }}
              >
                {leadText}
              </p>

              {post.coverImage ? (
                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(99,32,224,.15)",
                    maxWidth: 380,
                    marginBottom: 32,
                    boxShadow: "0 8px 32px rgba(99,32,224,.08)",
                  }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ) : null}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {trustPoints.map(([icon, title, sub]) => (
                  <div key={title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 11,
                        background: "rgba(99,32,224,.1)",
                        border: "1px solid rgba(99,32,224,.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--fb)",
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: "#1E293B",
                          lineHeight: 1.2,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--fb)",
                          fontSize: 12,
                          color: "#94A3B8",
                          lineHeight: 1.3,
                          marginTop: 2,
                        }}
                      >
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1.5px solid rgba(99,32,224,.15)",
                borderRadius: 24,
                boxShadow:
                  "0 8px 48px rgba(99,32,224,.1), 0 2px 8px rgba(0,0,0,.04)",
                padding: isMobile ? "28px 22px" : "40px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)",
                  borderRadius: "24px 24px 0 0",
                  pointerEvents: "none",
                }}
              />

              <GatedLeadDownloadForm
                slug={post.slug}
                title={post.title}
                downloadUrl={post.downloadUrl}
                downloadFilename={post.downloadFilename}
                pageSource={`Resource: ${post.title}`}
                isMobile={isMobile}
              />
            </div>
          </div>
        </section>
      </main>
      <VDDFooter onNavigate={onNavigate} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
