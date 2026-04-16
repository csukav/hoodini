"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const leftLinks = [
  { href: "/products", label: "HOODIE" },
  { href: "/products", label: "PÓLÓK" },
  { href: "/products", label: "NADRÁGOK" },
  { href: "/products", label: "SALE" },
];
const rightLinks = [{ href: "/help", label: "GYIK" }];
const mobileLinks = [
  { href: "/products", label: "Hoodie" },
  { href: "/products", label: "Pólók" },
  { href: "/products", label: "Nadrágok" },
  { href: "/products", label: "Sale" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-stone-950 text-stone-300 text-center overflow-hidden h-9 flex items-center">
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs tracking-widest uppercase font-medium">
          {[
            "Ingyenes szállítás 15 000 Ft felett",
            "30 napos visszaküldési garancia",
            "Ingyenes szállítás 15 000 Ft felett",
            "30 napos visszaküldési garancia",
          ].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header className="bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          aria-label="Főmenü"
        >
          <div className="flex items-center justify-between h-14">
            {/* Left nav links */}
            <ul className="hidden md:flex items-center gap-6" role="list">
              {leftLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="label-xl text-stone-600 hover:text-stone-950 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Center logo – absolute so it's perfectly centred */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl font-bold tracking-wide text-stone-950 hover:text-stone-600 transition-colors"
              aria-label="Hoodini – Főoldal"
            >
              HOODINI
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4 ml-auto">
              <ul className="hidden md:flex items-center gap-6" role="list">
                {rightLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="label-xl text-stone-600 hover:text-stone-950 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Search icon */}
              <button
                className="p-1 text-stone-600 hover:text-stone-950 transition-colors"
                aria-label="Keresés"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-1 text-stone-600 hover:text-stone-950 transition-colors"
                aria-label={`Kosár – ${totalItems} termék`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-stone-950 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-1 text-stone-600 hover:text-stone-950 transition-colors"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Menü bezárása" : "Menü megnyitása"}
              >
                {isOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div
              id="mobile-menu"
              className="md:hidden border-t border-stone-200 py-4 space-y-1 animate-fade-in"
            >
              {mobileLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block px-2 py-2.5 label-xs text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
