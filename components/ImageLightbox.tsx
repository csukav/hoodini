"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageLightbox({ images, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goToPrevious(e as any);
      else if (e.key === "ArrowRight") goToNext(e as any);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, images.length]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const currentImage = images[currentIndex] || images[0];

  return (
    <>
      {/* Thumbnail gallery */}
      <div className="space-y-3">
        {/* Main image – clickable */}
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
            loading="eager"
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

        {/* Thumbnail strip – only show if more than 1 image */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800 transition-opacity ${
                  currentIndex === idx ? "ring-2 ring-stone-900" : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`Kép ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${alt} ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

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

          {/* Image container */}
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
          </div>

          {/* Navigation – only show if more than 1 image */}
          {images.length > 1 && (
            <>
              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Előző kép"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Következő kép"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm font-semibold px-3 py-2 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
