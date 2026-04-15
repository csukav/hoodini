"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0 || added) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div
        className="relative overflow-hidden bg-stone-100"
        style={{ aspectRatio: "3/4" }}
      >
        <Link
          href={`/products/${product.slug}`}
          tabIndex={0}
          aria-label={product.name}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Low stock badge */}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="absolute top-3 left-3 bg-stone-950 text-white text-xs font-semibold px-2.5 py-1">
            Csak {product.stock} db!
          </span>
        )}

        {/* Out of stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="label-xs text-stone-500">Elfogyott</span>
          </div>
        )}

        {/* Quick-add */}
        {product.stock > 0 && (
          <button
            ref={btnRef}
            onClick={handleQuickAdd}
            aria-label={`${product.name} kosárba`}
            className="absolute bottom-0 left-0 right-0 bg-stone-950 text-white text-[0.65rem] font-bold tracking-[0.14em] uppercase py-3 text-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
          >
            {added ? "HOZZÁADVA ✓" : "KOSÁRBA"}
          </button>
        )}
      </div>

      {/* Text */}
      <div className="pt-3 pb-1">
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm font-medium text-stone-950 leading-snug line-clamp-2 hover:text-stone-600 transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-xs text-stone-400 mt-0.5">{product.category}</p>
        <p className="text-sm font-bold text-stone-950 mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
