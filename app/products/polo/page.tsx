import type { Metadata } from "next";
import ProductCategoryList from "@/components/ProductCategoryList";

export const metadata: Metadata = {
  title: "Póló – Hoodini",
  description: "Fedezd fel a Hoodini pólóit: kényelmes és trendi darabok minden napra.",
};

export const dynamic = "force-dynamic";

export default function PoloCategoryPage() {
  return <ProductCategoryList categorySlug="polo" categoryLabel="Póló" />;
}
