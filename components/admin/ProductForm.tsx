"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export interface ProductFormValues {
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
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
    images:
      initial.images && initial.images.length > 0
        ? initial.images
        : initial.image
          ? [initial.image]
          : [],
    description: initial.description ?? "",
    rating: initial.rating ?? 0,
    reviewCount: initial.reviewCount ?? 0,
    sizes: (initial.sizes as string[]) ?? [],
  });
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      for (const file of Array.from(files)) {
        formData.append("files", file);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
          code?: string;
          cwd?: string;
        };
        const messageParts = [data.error ?? `Feltoltesi hiba (${res.status}).`];
        if (data.details) messageParts.push(data.details);
        if (data.code) messageParts.push(`Kod: ${data.code}`);
        throw new Error(messageParts.join(" | "));
      }

      const data = (await res.json()) as { urls: string[] };
      setValues((v) => {
        const images = [...v.images, ...data.urls];
        return {
          ...v,
          images,
          image: images[0] ?? "",
        };
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Feltöltési hiba.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  function addManualImage() {
    const url = manualImageUrl.trim();
    if (!url) return;
    setValues((v) => {
      if (v.images.includes(url)) return v;
      const images = [...v.images, url];
      return {
        ...v,
        images,
        image: images[0] ?? "",
      };
    });
    setManualImageUrl("");
  }

  function removeImageAt(index: number) {
    setValues((v) => {
      const images = v.images.filter((_, i) => i !== index);
      return {
        ...v,
        images,
        image: images[0] ?? "",
      };
    });
  }

  function makePrimary(index: number) {
    setValues((v) => {
      if (index <= 0 || index >= v.images.length) return v;
      const images = [...v.images];
      const [picked] = images.splice(index, 1);
      images.unshift(picked);
      return {
        ...v,
        images,
        image: images[0] ?? "",
      };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const normalizedImages = values.images.filter(
        (url) => url.trim().length > 0,
      );
      await onSubmit({
        ...values,
        images: normalizedImages,
        image: normalizedImages[0] ?? "",
      });
      router.push("/admin");
    } catch (err) {
      console.error("[ProductForm] mentesi hiba:", err);
      const msg = err instanceof Error ? err.message : "Ismeretlen hiba.";
      if (
        msg.includes("projectId") ||
        msg.includes("invalid-argument") ||
        msg.includes("app/no-app")
      ) {
        setError("Firebase nincs konfigurálva. Toltsd ki az .env.local fajlt!");
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
      <div>
        <label className={labelClass}>Nev</label>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Slug (URL-barat azonosito)</label>
        <input
          type="text"
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ar (Ft)</label>
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
          <label className={labelClass}>Keszlet (db)</label>
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

      <div>
        <label className={labelClass}>Kategoria</label>
        <select
          required
          value={values.category}
          onChange={(e) => set("category", e.target.value)}
          className={fieldClass}
        >
          <option value="">- valassz -</option>
          <option value="hoodie">Hoodie</option>
          <option value="polo">Polo</option>
          <option value="nadrag">Nadrag</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Termekkepek (tobb kep is lehet)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => uploadFiles(e.target.files)}
          className={fieldClass}
          disabled={uploading}
        />
        <p className="mt-1 text-xs text-stone-400">
          Sajat geprol valaszthatsz ki tobb kepet. Az elso kep lesz a fo kep.
        </p>

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={manualImageUrl}
            onChange={(e) => setManualImageUrl(e.target.value)}
            placeholder="Vagy add meg egy kep URL-jet"
            className={fieldClass}
          />
          <button
            type="button"
            onClick={addManualImage}
            className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700 hover:bg-stone-100"
          >
            Hozzaad
          </button>
        </div>

        {values.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {values.images.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="rounded border border-stone-200 p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Termekkep ${i + 1}`}
                  className="h-28 w-full rounded object-cover"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => makePrimary(i)}
                    disabled={i === 0}
                    className="flex-1 border border-stone-300 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-stone-700 hover:bg-stone-100 disabled:opacity-50"
                  >
                    {i === 0 ? "Fo kep" : "Fo keppe"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImageAt(i)}
                    className="flex-1 border border-red-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-700 hover:bg-red-50"
                  >
                    Torles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Leiras</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ertekeles (0-5)</label>
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
          <label className={labelClass}>Velemenyek szama</label>
          <input
            type="number"
            min={0}
            value={values.reviewCount}
            onChange={(e) => set("reviewCount", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Elerheto meretek (vesszo-elvalasztva)
        </label>
        <input
          type="text"
          placeholder="XS, S, M, L, XL, XXL"
          value={values.sizes.join(", ")}
          onChange={(e) =>
            set(
              "sizes",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0),
            )
          }
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        {(error || uploading) && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {uploading ? (
              "Kepek feltoltese folyamatban..."
            ) : (
              <>
                <strong>Hiba:</strong> {error}
              </>
            )}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-stone-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? "Mentes..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border border-stone-300 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
          >
            Megse
          </button>
        </div>
      </div>
    </form>
  );
}
