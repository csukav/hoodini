import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
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
  searchParams: { session_id?: string; orderId?: string };
}) {
  let paid = false;
  let conversionValue: number | undefined;
  let transactionId: string | undefined;

  if (searchParams.session_id) {
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
      {paid && (
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
