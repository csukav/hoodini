"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] ?? "",
  );

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Kérjük, válassz egy méretet!");
      return;
    }
    addToCart(product, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 w-full sm:w-auto">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
        >
          <option value="">-- Méret kiválasztása --</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
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
