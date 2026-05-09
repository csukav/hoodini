import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

type UploadLike = {
  name?: string;
  type?: string;
  size?: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

function isUploadLike(value: unknown): value is UploadLike {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function"
  );
}

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
    const entries = formData.getAll("files");
    const files: UploadLike[] = entries.filter(isUploadLike) as UploadLike[];

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
      if (!file.type || !file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Csak kepfajlok tolthetők fel." },
          { status: 400 },
        );
      }

      if (!file.size || file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Egy kep maximum 8MB lehet." },
          { status: 400 },
        );
      }

      const fileName = safeFileName(file.name ?? "upload.jpg");
      const filePath = path.join(uploadDir, fileName);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);
      urls.push(`/uploads/products/${fileName}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("[admin/upload] hiba:", error);
    const details = error instanceof Error ? error.message : "Ismeretlen hiba";
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string"
        ? (error as { code: string }).code
        : undefined;
    return NextResponse.json(
      {
        error: "Feltoltes sikertelen.",
        details,
        code,
        cwd: process.cwd(),
      },
      { status: 500 },
    );
  }
}
