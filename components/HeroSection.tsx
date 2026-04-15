import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "92vh", minHeight: "560px" }}
      aria-label="Főoldal hero"
    >
      {/* Full-bleed background image */}
      <Image
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=85"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom-left text block */}
      <div className="absolute bottom-10 left-4 sm:left-8 lg:left-12 max-w-xl">
        <p className="label-xs text-stone-300 mb-3">
          2026 tavasz–nyár kollekció
        </p>
        <h1 className="heading-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          Stílus,
          <br />
          Megújítva.
        </h1>
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn-white">
            Kollekció megtekintése
          </Link>
          <Link
            href="#featured"
            className="btn-outline border-white text-white hover:bg-white hover:text-stone-950"
          >
            Kiemelt termékek
          </Link>
        </div>
      </div>

      {/* Scroll hint – desktop */}
      <div
        className="absolute bottom-10 right-8 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="label-xs text-white/50">Görgetés</span>
        <ArrowRight className="w-4 h-4 text-white/50 rotate-90" />
      </div>
    </section>
  );
}
