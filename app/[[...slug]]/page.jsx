import { notFound } from "next/navigation";
import NimbleS2PHomepage from "@/components/MainFile";
import { metadataForSlug, isKnownCatchAllSlug, SITEMAP_SLUGS } from "@/lib/seo";

/**
 * Prerender the home route ([]) and every known marketing slug as static HTML.
 * Unknown slugs are rendered on demand and 404'd by notFound() below, so they
 * return a real HTTP 404 + app/not-found.jsx instead of soft-404'ing as home.
 */
export function generateStaticParams() {
  return [{ slug: [] }, ...SITEMAP_SLUGS.map((slug) => ({ slug: [slug] }))];
}

/**
 * Server component: emits unique, server-rendered metadata per URL, then
 * renders the client homepage which picks the right page from the pathname.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!isKnownCatchAllSlug(slug)) {
    return {
      title: "Page Not Found — NimbleS2P",
      robots: { index: false, follow: true },
    };
  }
  const first = Array.isArray(slug) ? slug[0] : undefined;
  return metadataForSlug(first);
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!isKnownCatchAllSlug(slug)) notFound();
  return <NimbleS2PHomepage />;
}
