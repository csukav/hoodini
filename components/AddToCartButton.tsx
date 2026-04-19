"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
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
  );
}
