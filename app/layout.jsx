import { Inter, IBM_Plex_Mono, Kalam } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const GTM_ID = "GTM-T8WFVVR6";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NimbleS2P — AI-Orchestrated Source-to-Pay for the Indian Enterprise",
    template: "%s",
  },
  description:
    "NimbleS2P — AI-orchestrated source-to-pay for the Indian enterprise.",
  openGraph: {
    title: "NimbleS2P",
    description:
      "AI-orchestrated source-to-pay for the Indian enterprise.",
    type: "website",
    siteName: "NimbleS2P",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "NimbleS2P",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "NimbleS2P",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${kalam.variable}`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body
        className={inter.className}
        style={{
          fontFamily: "var(--fb, var(--font-inter)), Inter, system-ui, sans-serif",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
