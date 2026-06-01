import { NextResponse } from "next/server";
import { submitGatedDownloadToWeb3Forms } from "@/lib/web3formsServer";

export async function POST(request) {
  try {
    const payload = await request.json();
    const email = payload?.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 },
      );
    }

    if (!payload?.resourceTitle?.trim() || !payload?.resourceSlug?.trim()) {
      return NextResponse.json(
        { success: false, message: "Resource details are required." },
        { status: 400 },
      );
    }

    const data = await submitGatedDownloadToWeb3Forms({
      email,
      resourceTitle: String(payload.resourceTitle).trim(),
      resourceSlug: String(payload.resourceSlug).trim(),
      pageSource: payload.pageSource?.trim() || undefined,
      downloadUrl: payload.downloadUrl?.trim() || undefined,
      accessKey: payload.accessKey?.trim() || undefined,
    });

    return NextResponse.json({ success: true, ...data });
  } catch (err) {
    console.error("[forms/gated-download]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Submission failed" },
      { status: 502 },
    );
  }
}
