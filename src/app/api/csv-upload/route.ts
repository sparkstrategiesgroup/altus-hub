import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Papa from "papaparse";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "Only CSV files are accepted" },
        { status: 400 }
      );
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 10MB" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const result = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json({
      fileName: file.name,
      fileSize: file.size,
      rowCount: result.data.length,
      columns: result.meta.fields ?? [],
      preview: result.data.slice(0, 5),
      errors: result.errors.length > 0 ? result.errors.slice(0, 5) : undefined,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process CSV file" },
      { status: 500 }
    );
  }
}
