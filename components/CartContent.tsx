"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/CartItemRow";
import { formatPrice } from "@/lib/utils";

const SHIPPING_THRESHOLD = 15_000;
const SHIPPING_COST = 200;

export default function CartContent() {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  const shippingCost = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = totalPrice + shippingCost;
  const remaining = SHIPPING_THRESHOLD - totalPrice;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-stone-100 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-stone-400" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-stone-950 mb-2">
          A kosarad üres
        </h2>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Böngéssz a termékeink között, és add hozzá kedvenceidet a kosárhoz!
        </p>
        <Link
          href="/products"
          className="btn-dark inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Termékek böngészése
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <h1 className="text-3xl font-black text-stone-950 mb-8">
        Kosár{" "}
        <span className="text-stone-400 font-normal text-xl">
          ({totalItems} termék)
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* ── Items list ── */}
        <section className="lg:col-span-2" aria-label="Kosár tartalma">
          <div className="border border-stone-200 bg-white px-4 sm:px-6 py-2">
            <ul aria-label="Kosárban lévő termékek">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Vásárlás folytatása
            </Link>
            <button
              onClick={clearCart}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Kosár kiürítése
            </button>
          </div>
        </section>

        {/* ── Order summary ── */}
        <aside className="lg:col-span-1" aria-label="Rendelés összegzése">
          <div className="border border-stone-200 bg-stone-50 p-6 sticky top-24">
            <h2 className="label-xs text-stone-950 mb-5">
              Rendelés összegzése
            </h2>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-500">
                <dt>Részösszeg ({totalItems} db)</dt>
                <dd className="font-medium text-stone-800">
                  {formatPrice(totalPrice)}
                </dd>
              </div>
              <div className="flex justify-between text-stone-500">
                <dt>Szállítási díj</dt>
                <dd
                  className={`font-medium ${shippingCost === 0 ? "text-emerald-600" : "text-stone-800"}`}
                >
                  {shippingCost === 0 ? "Ingyenes" : formatPrice(shippingCost)}
                </dd>
              </div>
            </dl>

            {/* Free shipping progress */}
            {shippingCost > 0 && (
              <div className="mt-4 p-3 bg-stone-100 border border-stone-200 text-xs text-stone-600">
                Még{" "}
                <span className="font-bold text-stone-900">
                  {formatPrice(remaining)}
                </span>{" "}
                vásárlás és a szállítás ingyenes!
                <div className="mt-2 h-1 bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-stone-800 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalPrice / SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Grand total */}
            <div className="mt-5 pt-5 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-bold text-stone-950">Végösszeg</span>
              <span className="text-xl font-black text-stone-950">
                {formatPrice(grandTotal)}
              </span>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="btn-dark w-full mt-6 justify-center flex items-center gap-2 py-3.5"
            >
              Tovább a fizetéshez
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Biztonságos fizetés – SSL titkosítással védve
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
