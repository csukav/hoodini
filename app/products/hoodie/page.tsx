import type { Metadata } from "next";
import ProductCategoryList from "@/components/ProductCategoryList";

export const metadata: Metadata = {
  title: "Hoodie – Hoodini",
  description: "Válogass a Hoodini kapucnis pulóverek között: minőségi hoodiek streetwear stílusban.",
};

export const dynamic = "force-dynamic";

export default function HoodieCategoryPage() {
  return <ProductCategoryList categorySlug="hoodie" categoryLabel="Hoodie" />;
}
