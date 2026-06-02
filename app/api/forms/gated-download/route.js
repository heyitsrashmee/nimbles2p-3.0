import { NextResponse } from "next/server";
import { validateGatedResourceLeadForm } from "@/lib/leadFormValidation";
import { submitGatedDownloadToWeb3Forms } from "@/lib/web3formsServer";

export async function POST(request) {
  try {
    const payload = await request.json();
    const fields = {
      name: String(payload?.name ?? "").trim(),
      email: String(payload?.email ?? "").trim(),
      designation: String(payload?.designation ?? "").trim(),
      company: String(payload?.company ?? "").trim(),
      phone: String(payload?.phone ?? "").replace(/\D/g, ""),
      countryCode: String(payload?.countryCode ?? "+91").trim(),
    };

    const validationErrors = validateGatedResourceLeadForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, message: Object.values(validationErrors)[0] },
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
      name: fields.name,
      email: fields.email,
      designation: fields.designation,
      company: fields.company,
      phone: payload.phone?.trim() || fields.phone,
      countryCode: fields.countryCode,
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
