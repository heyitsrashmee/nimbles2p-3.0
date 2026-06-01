import { NextResponse } from "next/server";
import { submitBookDemoToWeb3Forms } from "@/lib/web3formsServer";

const REQUIRED = [
  "firstName",
  "lastName",
  "email",
  "company",
  "title",
  "employees",
  "industry",
  "timeline",
];

export async function POST(request) {
  try {
    const form = await request.json();

    for (const key of REQUIRED) {
      if (!form?.[key]?.toString?.().trim()) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${key}` },
          { status: 400 },
        );
      }
    }

    const data = await submitBookDemoToWeb3Forms({
      ...form,
      modules: Array.isArray(form.modules) ? form.modules : [],
    });

    return NextResponse.json({ success: true, ...data });
  } catch (err) {
    console.error("[forms/book-demo]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Submission failed" },
      { status: 502 },
    );
  }
}
