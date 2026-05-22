import { getMegaMenuFeaturedByModule } from "@/lib/wordpress";

export const revalidate = 3600;

export async function GET() {
  try {
    const featuredByModule = await getMegaMenuFeaturedByModule();
    return Response.json(featuredByModule);
  } catch (err) {
    console.error("[mega-menu-resources]", err);
    return Response.json({}, { status: 200 });
  }
}
