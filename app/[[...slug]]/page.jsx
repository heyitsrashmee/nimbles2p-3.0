import NimbleS2PHomepage from "@/components/MainFile";
import { metadataForSlug, SITEMAP_SLUGS } from "@/lib/seo";

/**
 * Prerender the home route ([]) and every known marketing slug as static HTML.
 * Unknown slugs still render on demand (dynamicParams defaults to true).
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
  const first = Array.isArray(slug) ? slug[0] : undefined;
  return metadataForSlug(first);
}

export default function Page() {
  return <NimbleS2PHomepage />;
}
