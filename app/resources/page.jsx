import { fetchResources } from "@/lib/wordpress";
import ResourcesRoute from "@/components/ResourcesRoute";

export const revalidate = 3600;

export default async function ResourcesPageRoute() {
  let featuredPost = null;
  let posts = null;

  try {
    const data = await fetchResources({ perPage: 24 });
    featuredPost = data.featuredPost;
    posts = data.posts?.length ? data.posts : null;
  } catch {
    /* ResourcesPage falls back to client fetch + placeholders */
  }

  return <ResourcesRoute featuredPost={featuredPost} posts={posts} />;
}
