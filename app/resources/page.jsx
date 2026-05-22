import { getResourcesForPage } from "@/lib/wordpress";
import ResourcesRoute from "@/components/ResourcesRoute";

export const revalidate = 3600;

export default async function ResourcesPageRoute() {
  const { featuredPost, posts } = await getResourcesForPage();
  const hasWpData = Boolean(featuredPost) || posts.length > 0;

  return (
    <ResourcesRoute
      featuredPost={featuredPost}
      posts={posts}
      dataFromServer={hasWpData}
    />
  );
}
