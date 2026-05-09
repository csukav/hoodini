import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

function safeFileName(original: string) {
  const ext = path.extname(original).toLowerCase() || ".jpg";
  const base = path
    .basename(original, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 40);
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}${ext}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Nem erkezett fajl." },
        { status: 400 },
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} kep toltheto fel egyszerre.` },
        { status: 400 },
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Csak kepfajlok tolthetők fel." },
          { status: 400 },
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Egy kep maximum 8MB lehet." },
          { status: 400 },
        );
      }

      const fileName = safeFileName(file.name);
      const filePath = path.join(uploadDir, fileName);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);
      urls.push(`/uploads/products/${fileName}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("[admin/upload] hiba:", error);
    return NextResponse.json(
      { error: "Feltoltes sikertelen." },
      { status: 500 },
    );
  }
}
