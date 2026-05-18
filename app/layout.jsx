import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "NimbleS2P",
  description:
    "NimbleS2P — AI-orchestrated source-to-pay for the Indian enterprise.",
  openGraph: {
    title: "NimbleS2P",
    description:
      "AI-orchestrated source-to-pay for the Indian enterprise.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className={inter.className} style={{ fontFamily: "var(--fb)" }}>
        {children}
      </body>
    </html>
  );
}
