import { notFound } from "next/navigation";
import {
  getAllResourceSlugs,
  getResourceArticleBySlug,
} from "@/lib/resources/wpcom/service";
import ResourceArticle from "@/components/ResourceArticle";
import ResourceArticleError from "@/components/ResourceArticleError";
import { SITE_URL } from "@/lib/seo";

/* ── ISR: pages are statically generated and revalidated hourly ── */
export const revalidate = 60;
export const dynamicParams = true; // slugs not prebuilt still render on-demand

const SITE = SITE_URL;

/** Prerender every WordPress post at build time. */
export async function generateStaticParams() {
  try {
    const slugs = await getAllResourceSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return []; // network hiccup at build → fall back to on-demand ISR
  }
}

/** Per-article SEO derived from WordPress data. */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  let articleResult = null;
  try {
    articleResult = await getResourceArticleBySlug(slug);
  } catch {
    /* handled below */
  }
  if (!articleResult || articleResult.status !== "success") {
    return { title: "Resource | NimbleS2P" };
  }

  const { article } = articleResult;

  const url = `${SITE}/resources/${slug}`;
  const images = article.coverImage ? [{ url: article.coverImage, alt: article.coverAlt }] : [];

  return {
    title: `${article.title} | NimbleS2P`,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
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
  const result = await getResourceArticleBySlug(slug);
  if (result.status === "not_found") notFound();
  if (result.status === "error") {
    return <ResourceArticleError message={result.errorMessage} />;
  }

  const article = result.article;
  const url = `${SITE}/resources/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "NimbleS2P",
      url: SITE,
    },
    articleSection: article.category,
    ...(article.tags.length ? { keywords: article.tags.join(", ") } : {}),
    ...(article.coverImage ? { image: [article.coverImage] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ResourceArticle post={article} />
    </>
  );
}
