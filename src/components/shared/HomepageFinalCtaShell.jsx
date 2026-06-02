"use client";

/**
 * Visual shell for the homepage FinalCTA — centered column, layered background, top/bottom waves.
 */
export function HomepageFinalCtaShell({ isMobile, children }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0f0c29",
        padding: isMobile ? "62px 20px 78px" : "clamp(72px,9vh,110px) 5vw",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "50%",
            height: "80%",
            background:
              "radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "55%",
            height: "75%",
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
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
            top: 0,
            left: 0,
            width: "200%",
            height: "100%",
            animation: "waveSlide 9s linear infinite",
          }}
        >
          <path
            d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z"
            fill="rgba(99,32,224,.15)"
          />
          <path
            d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z"
            fill="rgba(130,80,230,.09)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
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
          <path
            d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z"
            fill="rgba(130,80,230,.07)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)",
          }}
        />
      </div>
    </section>
  );
}

/** Primary CTA button — matches homepage FinalCTA */
export function HomepageFinalCtaButton({
  isMobile,
  onNavigate,
  label = "Get Started →",
  href,
}) {
  const isInternalPath = Boolean(href && href !== "#");

  return (
    <a
      href={href || "#"}
      onClick={(e) => {
        if (isInternalPath) return;
        e.preventDefault();
        if (typeof onNavigate === "function") onNavigate("getstarted");
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: "linear-gradient(135deg,#E8920A,#F5B020)",
        color: "#fff",
        borderRadius: 12,
        padding: isMobile ? "13px 36px" : "15px 48px",
        fontSize: isMobile ? 15 : 16.5,
        fontWeight: 700,
        textDecoration: "none",
        fontFamily: "var(--fb)",
        letterSpacing: "-.01em",
        boxShadow: "0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset",
        transition: "transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 14px 40px rgba(232,150,10,.65)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow =
          "0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset";
      }}
    >
      {label}
    </a>
  );
}
