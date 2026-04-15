import type { Metadata } from "next";
import CartContent from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Kosár",
  description: "Tekintsd meg a kosár tartalmát és fejezd be a vásárlást.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartContent />;
}
