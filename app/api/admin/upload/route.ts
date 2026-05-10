import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

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

function parseCloudinaryUrl(raw: string): CloudinaryConfig | null {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "cloudinary:") return null;

    const apiSecret = decodeURIComponent(parsed.password);
    const apiKey = decodeURIComponent(parsed.username);
    const cloudName = parsed.hostname;

    if (!apiSecret || !apiKey || !cloudName) return null;
    return { cloudName, apiKey, apiSecret };
  } catch {
    return null;
  }
}

function getCloudinaryConfig(): CloudinaryConfig | null {
  const urlValue =
    process.env.CLOUDINARY_URL ??
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (urlValue) {
    const parsed = parseCloudinaryUrl(urlValue);
    if (parsed) return parsed;
  }

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret };
  }

  return null;
}

function buildSignature(params: Record<string, string>, apiSecret: string) {
  const signaturePayload = Object.entries(params)
    .filter(([, value]) => value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${signaturePayload}${apiSecret}`)
    .digest("hex");
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

    const cloudinary = getCloudinaryConfig();
    if (!cloudinary) {
      return NextResponse.json(
        {
          error: "Cloudinary nincs konfigurálva.",
          details:
            "Adj meg CLOUDINARY_URL-t, vagy CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET értékeket.",
        },
        { status: 500 },
      );
    }

    const urls: string[] = [];
    const folder = "hoodini/products";

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

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = buildSignature(
        { folder, timestamp },
        cloudinary.apiSecret,
      );
      const bytes = await file.arrayBuffer();
      const blob = new Blob([bytes], { type: file.type ?? "image/jpeg" });

      const uploadForm = new FormData();
      uploadForm.append("file", blob, file.name ?? "upload.jpg");
      uploadForm.append("api_key", cloudinary.apiKey);
      uploadForm.append("timestamp", timestamp);
      uploadForm.append("folder", folder);
      uploadForm.append("signature", signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadForm,
        },
      );

      const payload = (await response.json()) as {
        secure_url?: string;
        error?: { message?: string };
      };

      if (!response.ok || !payload.secure_url) {
        throw new Error(
          payload.error?.message ?? "Cloudinary feltoltes sikertelen.",
        );
      }

      urls.push(payload.secure_url);
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
