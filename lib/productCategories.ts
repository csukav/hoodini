export const productCategoryRoutes = [
  { slug: "hoodie", label: "Hoodie" },
  { slug: "polo", label: "Póló" },
  { slug: "nadrag", label: "Nadrág" },
];

export function normalizeCategorySlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function categoryLabelToSlug(label: string): string {
  const mapped = productCategoryRoutes.find((item) => item.label === label);
  return mapped ? mapped.slug : normalizeCategorySlug(label);
}

export function categorySlugToLabel(slug: string): string | undefined {
  return productCategoryRoutes.find((item) => item.slug === slug)?.label;
}
