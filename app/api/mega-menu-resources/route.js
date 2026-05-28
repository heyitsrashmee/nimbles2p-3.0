import { getMegaMenuFeaturedByModuleWpcom } from "@/lib/resources/wpcom/service";

export const revalidate = 3600;

export async function GET() {
  try {
    const featuredByModule = await getMegaMenuFeaturedByModuleWpcom();
    return Response.json(featuredByModule);
  } catch (err) {
    console.error("[mega-menu-resources]", err);
    return Response.json({}, { status: 200 });
  }
}
