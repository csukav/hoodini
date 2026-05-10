"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  images?: string[];
}

export default function ImageLightbox({ src, alt, images }: Props) {
  const [open, setOpen] = useState(false);
  const galleryImages = (() => {
    const all = [src, ...(images ?? [])].filter((url) => url.trim().length > 0);
    return Array.from(new Set(all));
  })();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [src]);

  const currentImage = galleryImages[currentIndex] ?? src;

  const prevImage = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  }, [galleryImages.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (galleryImages.length > 1 && e.key === "ArrowLeft") prevImage();
      if (galleryImages.length > 1 && e.key === "ArrowRight") nextImage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, galleryImages.length, prevImage, nextImage]);

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
      <div>
        <button
          onClick={() => setOpen(true)}
          className="relative aspect-square w-full overflow-hidden bg-stone-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
          aria-label="Kép nagyítása"
        >
          <Image
            src={currentImage}
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

        {galleryImages.length > 1 && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {galleryImages.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square overflow-hidden border ${
                  index === currentIndex
                    ? "border-stone-900"
                    : "border-stone-200 hover:border-stone-400"
                }`}
                aria-label={`Kep valasztasa ${index + 1}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${alt} ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
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
              src={currentImage}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              quality={95}
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                  aria-label="Elozo kep"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                  aria-label="Kovetkezo kep"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
                  {currentIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
