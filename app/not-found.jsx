import Link from "next/link";

/**
 * Global 404 page. Rendered (with a real HTTP 404 status) for any URL that
 * isn't a known marketing route, resource, or download — replacing the old
 * soft-404 behaviour where unknown slugs served the homepage with a 200.
 */
export const metadata = {
  title: "Page Not Found — NimbleS2P",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        fontFamily: "var(--fb, var(--font-inter)), Inter, system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".08em", color: "#E8920A", margin: 0 }}>
        404
      </p>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: "12px 0 8px", color: "#0F172A" }}>
        Page not found
      </h1>
      <p style={{ fontSize: 16, color: "#475569", maxWidth: 440, margin: "0 0 28px" }}>
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "linear-gradient(135deg,#E8920A,#F5B020)",
          color: "#fff",
          borderRadius: 12,
          padding: "13px 30px",
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 6px 28px rgba(232,150,10,.45)",
        }}
      >
        Back to home →
      </Link>
    </main>
  );
}
