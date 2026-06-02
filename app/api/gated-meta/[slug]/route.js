import { NextResponse } from "next/server";
import { fetchGatedMetaForSlug } from "@/lib/gatedResourceMeta";

export async function GET(_request, { params }) {
  const resolved = await params;
  const slug = resolved?.slug?.trim();
  if (!slug) {
    return NextResponse.json(
      { gated: false, downloadUrl: "", downloadFilename: "" },
      { status: 400 },
    );
  }

  const meta = await fetchGatedMetaForSlug(slug);
  return NextResponse.json(meta);
}
