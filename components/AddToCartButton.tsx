"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: Product;
  availableSizes?: string[];
}

export default function AddToCartButton({
  product,
  availableSizes = [],
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] ?? "");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {availableSizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-stone-700 mb-2">Méret</p>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 text-sm rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                  selectedSize === size
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-700 border-stone-300 hover:border-stone-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      <Button
        size="lg"
        onClick={handleAdd}
        disabled={product.stock === 0}
        aria-live="polite"
        className="w-full sm:w-auto bg-stone-900 text-white border-2 border-stone-900 hover:bg-stone-800 hover:border-stone-800"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" aria-hidden="true" />
            Hozzáadva!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            {product.stock === 0 ? "Elfogyott" : "Kosárba teszem"}
          </>
        )}
      </Button>
    </div>
  );
}
