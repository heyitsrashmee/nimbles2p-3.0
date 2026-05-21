import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchAllSlugs } from "@/lib/wordpress";
import ResourceArticle from "@/components/ResourceArticle";

/* ── ISR: pages are statically generated and revalidated hourly ── */
export const revalidate = 3600;
export const dynamicParams = true; // slugs not prebuilt still render on-demand

const SITE = "https://nimbles2p.com";

/** Prerender every WordPress post at build time. */
export async function generateStaticParams() {
  try {
    const slugs = await fetchAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return []; // network hiccup at build → fall back to on-demand ISR
  }
}

/** Per-article SEO derived from WordPress data. */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  let article = null;
  try {
    article = await fetchPostBySlug(slug);
  } catch {
    /* handled below */
  }
  if (!article) return { title: "Resource | NimbleS2P" };

  const url = `${SITE}/resources/${slug}`;
  const images = article.coverImage ? [{ url: article.coverImage, alt: article.coverAlt }] : [];

  return {
    title: `${article.title} | NimbleS2P`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      images,
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ResourceArticlePage({ params }) {
  const { slug } = await params;
  const article = await fetchPostBySlug(slug);
  if (!article) notFound();

  return <ResourceArticle post={article} />;
}
