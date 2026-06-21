import { NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;

    return NextResponse.json({ text, success: true });
  } catch (error) {
    console.error("PDF Parsing error:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
