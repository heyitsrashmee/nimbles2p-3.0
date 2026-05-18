import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
