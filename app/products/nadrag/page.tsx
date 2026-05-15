import type { Metadata } from "next";
import ProductCategoryList from "@/components/ProductCategoryList";

export const metadata: Metadata = {
  title: "Nadrág – Hoodini",
  description: "Válogass a Hoodini nadrágjai között: stílusos és kényelmes streetwear darabok.",
};

export const dynamic = "force-dynamic";

export default function NadragCategoryPage() {
  return <ProductCategoryList categorySlug="nadrag" categoryLabel="Nadrág" />;
}
