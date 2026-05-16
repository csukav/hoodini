import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Banknote } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import GadsConversionEvent from "@/components/GadsConversionEvent";

export const metadata: Metadata = {
  title: "Rendelés visszaigazolva – Hoodini",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; orderId?: string; cod?: string; order_id?: string };
}) {
  const isCod = searchParams.cod === "1";
  let paid = false;
  let conversionValue: number | undefined;
  let transactionId: string | undefined;

  // Utánvétes rendelés – nincs Stripe session
  if (isCod) {
    paid = true; // A rendelés sikeresen fel lett adva
    transactionId = searchParams.order_id;
  } else if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        searchParams.session_id,
      );
      paid = session.payment_status === "paid";

      if (paid) {
        // HUF has no decimal places in Stripe, so amount_total is already HUF
        conversionValue = session.amount_total ?? undefined;
        transactionId = session.metadata?.orderId ?? session.id;

        // Update the order in Firestore
        if (session.metadata?.orderId) {
          const orderRef = doc(db, "orders", session.metadata.orderId);
          const orderSnap = await getDoc(orderRef);
          if (orderSnap.exists() && !orderSnap.data().stripeSessionId) {
            await updateDoc(orderRef, {
              status: "confirmed",
              stripeSessionId: session.id,
              updatedAt: serverTimestamp(),
            });
          }
        }
      }
    } catch {
      // session not found – show generic success
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center">
      {paid && !isCod && (
        <GadsConversionEvent
          value={conversionValue}
          currency="HUF"
          transactionId={transactionId}
        />
      )}
      <CheckCircle2
        className="w-20 h-20 mx-auto mb-6 text-emerald-500"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-black text-stone-950 mb-3">
        {isCod ? "Rendelés leadva!" : paid ? "Sikeres fizetés!" : "Rendelés leadva!"}
      </h1>
      <p className="text-stone-500 mb-6 leading-relaxed">
        Köszönjük a vásárlást! Elküldtük a visszaigazolást a megadott
        e-mail-címre. Hamarosan felvesszük veled a kapcsolatot.
      </p>
      {isCod && (
        <div className="mb-8 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-left">
          <Banknote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">
              Utánvétes fizetés
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              A csomag átvételekor kérjük, tartsd készen a pontos összeget a
              futár számára. Az összeg tartalmazza az utánvét kezelési díját is.
            </p>
          </div>
        </div>
      )}
      <Link
        href="/products"
        className="btn-dark inline-flex items-center gap-2"
      >
        Vásárlás folytatása
      </Link>
    </div>
  );
}
