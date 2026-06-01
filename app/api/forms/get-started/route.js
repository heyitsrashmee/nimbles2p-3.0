import { NextResponse } from "next/server";
import { submitGetStartedToWeb3Forms } from "@/lib/web3formsServer";

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, phone } = payload ?? {};

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    const data = await submitGetStartedToWeb3Forms({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      designation: payload.designation?.trim() || undefined,
      company: payload.company?.trim() || undefined,
    });

    return NextResponse.json({ success: true, ...data });
  } catch (err) {
    console.error("[forms/get-started]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Submission failed" },
      { status: 502 },
    );
  }
}
