import { v2 as cloudinary } from "cloudinary";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

// Configure Cloudinary
const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ??
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  cloud_name: cloudName,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    if (!cloudName || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        {
          error:
            "Cloudinary nincs megfelelően konfigurálva. Ellenőrizd a CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY és CLOUDINARY_API_SECRET környezeti változókat.",
        },
        { status: 500 }
      );
    }
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Nincs fájl feltöltve vagy a fájlformátum érvénytelen" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type || "application/octet-stream"};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "hoodini-products",
      resource_type: "auto",
      quality: "auto:best",
      fetch_format: "auto",
    });

    if (!result?.secure_url) {
      return NextResponse.json(
        { error: "Cloudinary nem adott vissza URL-t" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("[Upload] Hiba:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Szerver hiba a feltöltéskor",
      },
      { status: 500 }
    );
  }
}
