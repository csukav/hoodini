import { v2 as cloudinary } from "cloudinary";
import { NextResponse, type NextRequest } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nincs fájl feltöltve" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    return new Promise<NextResponse>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "hoodini-products", // Organize uploads in a folder
          resource_type: "auto",
          quality: "auto:best",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) {
            resolve(
              NextResponse.json(
                { error: `Cloudinary feltöltési hiba: ${error.message}` },
                { status: 500 }
              )
            );
          } else if (result?.secure_url) {
            resolve(
              NextResponse.json({
                url: result.secure_url,
                publicId: result.public_id,
              })
            );
          } else {
            resolve(
              NextResponse.json(
                { error: "Ismeretlen hiba a feltöltés során" },
                { status: 500 }
              )
            );
          }
        }
      );

      uploadStream.end(buffer);
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
