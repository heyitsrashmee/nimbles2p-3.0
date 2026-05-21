import { getResourcesForPage } from "@/lib/wordpress";
import ResourcesRoute from "@/components/ResourcesRoute";

export const revalidate = 3600;

export default async function ResourcesPageRoute() {
  try {
    const { featuredPost, posts } = await getResourcesForPage();
    return (
      <ResourcesRoute
        featuredPost={featuredPost}
        posts={posts}
        dataFromServer
      />
    );
  } catch (err) {
    console.error("[resources] WordPress fetch failed:", err);
    return (
      <ResourcesRoute
        featuredPost={null}
        posts={[]}
        dataFromServer={false}
      />
    );
  }
}
