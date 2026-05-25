"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSiteNavigation } from "@/lib/siteNavigation";
import ResourcesPage from "@/components/ResourcesPage";

/** Client shell for /resources — wires SPA navigation; data comes from the server page. */
export default function ResourcesRoute({
  featuredPost = null,
  posts = [],
  fetchState = "success",
  errorMessage = "",
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate, resourceSection } = useSiteNavigation(pathname, router);

  return (
    <ResourcesPage
      featuredPost={featuredPost}
      posts={posts}
      fetchState={fetchState}
      errorMessage={errorMessage}
      onBack={() => navigate("home")}
      onNavigate={navigate}
      resourceSection={resourceSection}
    />
  );
}
