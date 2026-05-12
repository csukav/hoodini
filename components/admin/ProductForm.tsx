"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload } from "lucide-react";

export interface ProductFormValues {
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviewCount: number;
}

interface ProductFormProps {
  initial?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

export default function ProductForm({
  initial = {},
  onSubmit,
  submitLabel = "Mentés",
}: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    name: initial.name ?? "",
    slug: initial.slug ?? "",
    price: initial.price ?? 0,
    category: initial.category ?? "",
    stock: initial.stock ?? 0,
    image: initial.image ?? "",
    images: initial.images ?? [],
    description: initial.description ?? "",
    rating: initial.rating ?? 0,
    reviewCount: initial.reviewCount ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleNameChange(name: string) {
    setValues((v) => ({
      ...v,
      name,
      slug:
        v.slug === slugify(v.name) || v.slug === "" ? slugify(name) : v.slug,
    }));
  }

  function set<K extends keyof ProductFormValues>(
    key: K,
    val: ProductFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setError(null);

    try {
      const newImages: string[] = [...(values.images ?? [])];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Feltöltési hiba");
        }

        const data = await response.json();
        newImages.push(data.url);
      }

      setValues((v) => {
        const updatedImages = newImages;
        return {
          ...v,
          images: updatedImages,
          // Set first image as main image if not set
          image: v.image || updatedImages[0] || "",
        };
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("[ProductForm] Feltöltési hiba:", err);
      const msg = err instanceof Error ? err.message : "Ismeretlen hiba";
      setError(`Képfeltöltés sikertelen: ${msg}`);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setValues((v) => {
      const updatedImages = (v.images ?? []).filter((_, i) => i !== index);
      return {
        ...v,
        images: updatedImages,
        // If we removed the main image, set the first remaining as main
        image: v.image === (v.images ?? [])[index] 
          ? updatedImages[0] || "" 
          : v.image,
      };
    });
  }

  function setMainImage(index: number) {
    const images = values.images ?? [];
    if (images[index]) {
      set("image", images[index]);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSubmit(values);
      router.push("/admin");
    } catch (err) {
      console.error("[ProductForm] mentési hiba:", err);
      const msg = err instanceof Error ? err.message : "Ismeretlen hiba.";
      if (
        msg.includes("projectId") ||
        msg.includes("invalid-argument") ||
        msg.includes("app/no-app")
      ) {
        setError("Firebase nincs konfigurálva. Töltsd ki az .env.local fájlt!");
      } else {
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  }

  const fieldClass =
    "w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800";
  const labelClass =
    "mb-1 block text-xs font-semibold uppercase tracking-widest text-stone-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelClass}>Név</label>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug (URL-barát azonosító)</label>
        <input
          type="text"
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ár (Ft)</label>
          <input
            type="number"
            required
            min={0}
            value={values.price}
            onChange={(e) => set("price", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Készlet (db)</label>
          <input
            type="number"
            required
            min={0}
            value={values.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Kategória</label>
        <select
          required
          value={values.category}
          onChange={(e) => set("category", e.target.value)}
          className={fieldClass}
        >
          <option value="">— válassz —</option>
          <option value="hoodie">Hoodie</option>
          <option value="polo">Póló</option>
          <option value="nadrág">Nadrág</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      {/* Image Upload - Cloudinary */}
      <div>
        <label className={labelClass}>Termék képek (Cloudinary)</label>
        <div className="rounded border-2 border-dashed border-stone-300 bg-stone-50 p-6 text-center">
          <Upload className="mx-auto mb-2 h-8 w-8 text-stone-400" />
          <p className="mb-3 text-sm text-stone-600">
            Kattints a képek kiválasztásához vagy húzd ide őket
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="rounded bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
            >
              {uploading ? "Feltöltés..." : "Képek kiválasztása"}
            </button>
          </label>
          <p className="mt-2 text-xs text-stone-500">
            PNG, JPG, WebP – max 5MB per kép
          </p>
        </div>

        {/* Uploaded Images Preview */}
        {(values.images ?? []).length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-600">
              Feltöltött képek ({values.images?.length})
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {values.images?.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Termékkép ${idx + 1}`}
                    className={`h-24 w-full rounded object-cover ${
                      values.image === url ? "ring-2 ring-stone-900" : ""
                    }`}
                  />

                  {/* Main image indicator */}
                  {values.image === url && (
                    <span className="absolute bottom-1 left-1 bg-stone-900 px-2 py-1 text-xs font-semibold text-white rounded">
                      Fő kép
                    </span>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 hidden rounded bg-black/50 group-hover:flex items-center justify-center gap-2">
                    {values.image !== url && (
                      <button
                        type="button"
                        onClick={() => setMainImage(idx)}
                        className="rounded bg-white px-2 py-1 text-xs font-semibold text-stone-900 hover:bg-stone-100"
                        title="Fő képként beállítás"
                      >
                        Fő
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="rounded bg-red-600 p-1 text-white hover:bg-red-700"
                      title="Kép törlése"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!values.images?.length && (
          <p className="mt-2 text-xs text-stone-400">
            Még nincs feltöltött kép. Feltölts néhány képet a termékhez!
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Leírás</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Rating + Reviews */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Értékelés (0–5)</label>
          <input
            type="number"
            step={0.1}
            min={0}
            max={5}
            value={values.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Vélemények száma</label>
          <input
            type="number"
            min={0}
            value={values.reviewCount}
            onChange={(e) => set("reviewCount", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        {error && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Hiba:</strong> {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-stone-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? "Mentés..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border border-stone-300 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
          >
            Mégse
          </button>
        </div>
      </div>
    </form>
  );
}
