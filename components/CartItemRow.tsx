"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <li className="flex gap-4 py-5 border-b border-stone-200 last:border-0">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-stone-100 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">
          {product.category}
        </p>
        <h3 className="font-semibold text-stone-950 text-sm mt-0.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-stone-600 mt-1">
          {formatPrice(product.price)}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-3 gap-2">
          {/* Quantity stepper */}
          <div
            className="inline-flex items-center border border-stone-200 overflow-hidden bg-white"
            role="group"
            aria-label="Mennyiség"
          >
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-2 hover:bg-stone-50 transition-colors text-stone-400 hover:text-stone-900"
              aria-label="Mennyiség csökkentése"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span
              className="px-4 text-sm font-semibold text-stone-950 min-w-[2.5rem] text-center"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-2 hover:bg-stone-50 transition-colors text-stone-400 hover:text-stone-900"
              aria-label="Mennyiség növelése"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="p-2 text-stone-300 hover:text-red-500 transition-colors"
            aria-label={`${product.name} eltávolítása a kosárból`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Line total – visible on sm+ */}
      <div className="hidden sm:flex flex-col items-end justify-between">
        <span className="font-bold text-stone-800 text-sm">
          {formatPrice(product.price * quantity)}
        </span>
      </div>
    </li>
  );
}
