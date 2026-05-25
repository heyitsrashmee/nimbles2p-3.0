import { Nav } from "@/components/layout/SiteNav";

export default function ResourceArticleLoadingRoute() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 72, background: "#fff", minHeight: "100vh" }}>
        <section
          style={{
            background: "linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
            padding: "88px 5vw 72px",
            minHeight: 320,
          }}
        />
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 5vw 80px" }}>
          <div
            style={{
              height: 300,
              borderRadius: 16,
              background: "linear-gradient(90deg, #EDE9FE 0%, #F5F3FF 50%, #EDE9FE 100%)",
              backgroundSize: "200% 100%",
              animation: "resources-shimmer 1.4s ease-in-out infinite",
              marginBottom: 40,
            }}
          />
          <div style={{ maxWidth: 680 }}>
            {[44, 88, 72, 96].map((width, index) => (
              <div
                key={index}
                style={{
                  height: index === 0 ? 22 : 14,
                  width: `${width}%`,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #EDE9FE 0%, #F5F3FF 50%, #EDE9FE 100%)",
                  backgroundSize: "200% 100%",
                  animation: "resources-shimmer 1.4s ease-in-out infinite",
                  marginBottom: 18,
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <style>{`
        @keyframes resources-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
