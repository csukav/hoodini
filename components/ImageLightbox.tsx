"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function ImageLightbox({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail – clickable */}
      <button
        onClick={() => setOpen(true)}
        className="relative aspect-square w-full overflow-hidden bg-stone-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
        aria-label="Kép nagyítása"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 rounded-full p-3">
            <ZoomIn className="w-6 h-6 text-stone-800" />
          </div>
        </div>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            aria-label="Bezárás"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image container – stop propagation so clicking image doesn't close */}
          <div
            className="relative w-full max-w-3xl max-h-[90vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              quality={95}
            />
          </div>
        </div>
      )}
    </>
  );
}
