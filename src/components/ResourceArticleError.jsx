"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSiteNavigation } from "@/lib/siteNavigation";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

export default function ResourceArticleError({
  title = "Unable to load this resource",
  message = "Please refresh the page or try again shortly.",
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useSiteNavigation(pathname, router);

  return (
    <>
      <Nav onNavigate={navigate} onBack={() => navigate("home")} pageName="Resources" />
      <main style={{ minHeight: "calc(100vh - 72px)", paddingTop: 72, background: "#F5F3FF" }}>
        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 20px" }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(57,16,133,.12)",
              borderRadius: 20,
              padding: "48px 32px",
              boxShadow: "0 8px 40px rgba(57,16,133,.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h1
              style={{
                fontFamily: "var(--fb)",
                fontSize: "clamp(24px,4vw,34px)",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-.03em",
                marginBottom: 12,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: "var(--fb)",
                fontSize: 15,
                color: "#64748B",
                lineHeight: 1.75,
                maxWidth: 540,
                margin: "0 auto 24px",
              }}
            >
              {message}
            </p>
            <a
              href="/resources"
              onClick={(e) => {
                e.preventDefault();
                navigate("resources");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg,#E8960A,#F5A623)",
                color: "#fff",
                borderRadius: 10,
                padding: "12px 24px",
                fontSize: 14.5,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--fb)",
              }}
            >
              Back to Resources →
            </a>
          </div>
        </section>
      </main>
      <VDDFooter onNavigate={navigate} />
    </>
  );
}
