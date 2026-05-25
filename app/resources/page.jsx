import { getResourcesIndex } from "@/lib/resources/wpcom/service";
import ResourcesRoute from "@/components/ResourcesRoute";

export const revalidate = 60;
const SITE = "https://nimbles2p.com";
const PAGE_TITLE = "Resources | NimbleS2P";
const PAGE_DESCRIPTION =
  "Explore insights, practical playbooks, customer success stories, and industry trends that help enterprises transform supplier and procurement operations.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE}/resources` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE}/resources`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default async function ResourcesPageRoute() {
  const result = await getResourcesIndex();
  const allPosts = [result.featuredPost, ...result.posts].filter(Boolean);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NimbleS2P Resources",
    description: PAGE_DESCRIPTION,
    url: `${SITE}/resources`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}${post.slug}`,
        name: post.title,
        ...(post.coverImage ? { image: post.coverImage } : {}),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ResourcesRoute
        featuredPost={result.featuredPost}
        posts={result.posts}
        fetchState={result.status}
        errorMessage={result.status === "error" ? result.errorMessage : ""}
      />
    </>
  );
}
