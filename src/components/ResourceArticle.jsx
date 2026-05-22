"use client";

/**
 * Client wrapper for the /resources/{slug} server route.
 *
 * The article page is server-rendered (data + SEO), but the reused
 * <BlogPostPage> template and the shared Nav/Footer navigate via the same
 * client router as the rest of the site. This bridges the two: it supplies the
 * SPA `navigate` function (from useSiteNavigation) so breadcrumbs, nav links,
 * and the footer behave exactly as they do inside MainFile.
 */

import { usePathname, useRouter } from "next/navigation";
import { useSiteNavigation } from "@/lib/siteNavigation";
import BlogPostPage from "@/components/BlogPostPage";
import GatedResourcePage from "@/components/GatedResourcePage";

export default function ResourceArticle({ post }) {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useSiteNavigation(pathname, router);

  if (post.gated && post.downloadUrl) {
    return (
      <GatedResourcePage
        post={post}
        onNavigate={navigate}
        onBack={() => navigate("home")}
      />
    );
  }

  return (
    <BlogPostPage
      post={post}
      onNavigate={navigate}
      onBack={() => navigate("home")}
    />
  );
}
