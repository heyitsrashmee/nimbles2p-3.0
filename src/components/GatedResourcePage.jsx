"use client";

import { useEffect } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";
import GatedDownloadForm from "@/components/GatedDownloadForm";

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
    sm("og:url", `${base}/resources/${post.slug}`, true);
    if (post.coverImage) sm("og:image", post.coverImage, true);
  }, [post]);
}

/**
 * Gated guide landing — email required before PDF download.
 */
export default function GatedResourcePage({ post, onBack, onNavigate }) {
  const w = useWidth();
  const isMobile = w < 640;
  useSEOHead(post);

  const leadText =
    post.content?.find((b) => b.type === "lead")?.text || post.excerpt;

  return (
    <div style={{ fontFamily: "var(--fb)", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @keyframes waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
      `}</style>

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Resources" />
      <div style={{ height: 72 }} />

      <section
        style={{
          background:
            "linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)",
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "48px 20px 72px" : "clamp(56px,7vh,88px) 5vw 96px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-5%",
            width: "55%",
            height: "85%",
            background:
              "radial-gradient(ellipse, rgba(245,166,35,.16) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-5%",
            width: "55%",
            height: "80%",
            background:
              "radial-gradient(ellipse, rgba(99,32,224,.28) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "26px 26px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <nav aria-label="breadcrumb" style={{ marginBottom: 20 }}>
            <ol
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                listStyle: "none",
                padding: 0,
                margin: 0,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Home", page: "home" },
                { label: "Resources", page: "resources" },
                { label: post.category },
              ].map(({ label, page }, i) => (
                <li key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && (
                    <span style={{ color: "rgba(255,255,255,.25)", fontSize: 12 }}>›</span>
                  )}
                  {page ? (
                    <a
                      href={page === "home" ? "/" : `/${page}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.(page);
                      }}
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,.45)",
                        textDecoration: "none",
                        fontFamily: "var(--fb)",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,.7)",
                        fontFamily: "var(--fb)",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 40 : 72,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  background: "rgba(245,166,35,.12)",
                  border: "1px solid rgba(245,166,35,.28)",
                  borderRadius: 100,
                  padding: "5px 14px",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#F5A623",
                    display: "inline-block",
                    animation: "pulse-dot 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#F5D060",
                    fontFamily: "var(--fb)",
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                  }}
                >
                  Free Guide
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--fb)",
                  fontWeight: 900,
                  fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(28px,3.2vw,42px)",
                  lineHeight: 1.12,
                  paddingBottom: "0.12em",
                  letterSpacing: "-.04em",
                  background:
                    "linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 16,
                }}
              >
                {post.title}
              </h1>
              <p
                style={{
                  fontSize: isMobile ? 14.5 : 16,
                  color: "rgba(255,255,255,.52)",
                  lineHeight: 1.75,
                  fontFamily: "var(--fb)",
                  marginBottom: 24,
                }}
              >
                {leadText}
              </p>
              {post.coverImage ? (
                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,.12)",
                    maxWidth: 420,
                  }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ) : null}
            </div>

            <div
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 20,
                padding: isMobile ? "28px 22px" : "36px 32px",
                backdropFilter: "blur(16px)",
              }}
            >
              <GatedDownloadForm
                slug={post.slug}
                title={post.title}
                downloadUrl={post.downloadUrl}
                downloadFilename={post.downloadFilename}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 52,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200%",
              height: "100%",
              animation: "waveSlide 10s linear infinite",
            }}
          >
            <path
              d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z"
              fill="rgba(99,32,224,.12)"
            />
          </svg>
        </div>
      </section>

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}
