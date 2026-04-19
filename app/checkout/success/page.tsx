import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Rendelés visszaigazolva – Hoodini",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; orderId?: string };
}) {
  let paid = false;

  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        searchParams.session_id,
      );
      paid = session.payment_status === "paid";
    } catch {
      // session not found – show generic success
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center">
      <CheckCircle2
        className="w-20 h-20 mx-auto mb-6 text-emerald-500"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-black text-stone-950 mb-3">
        {paid ? "Sikeres fizetés!" : "Rendelés leadva!"}
      </h1>
      <p className="text-stone-500 mb-10 leading-relaxed">
        Köszönjük a vásárlást! Elküldtük a visszaigazolást a megadott
        e-mail-címre. Hamarosan felvesszük veled a kapcsolatot.
      </p>
      <Link
        href="/products"
        className="btn-dark inline-flex items-center gap-2"
      >
        Vásárlás folytatása
      </Link>
    </div>
  );
}
