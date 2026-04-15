import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "klasszikus-hoodie-fekete",
    name: "Klasszikus Hoodie – Fekete",
    price: 12990,
    image: "https://imgur.com/a/YVeP13Y",
    description:
      "Prémium minőségű, 100% organikus pamutból készült kapucnis pulóver. Kényelmes szabása és tartós anyaga miatt ideális mindennapi viseletre. A kapucniján állítható húzózsinór található, elöl kenguruzsebbel rendelkezik. Gépi mosható, 30°C-on.",
    category: "Hoodie",
    stock: 24,
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "2",
    slug: "oversize-hoodie-fekete",
    name: "Oversize Hoodie – Fekete",
    price: 14990,
    image: "https://imgur.com/a/YVeP13Y",
    description:
      "Lazán szabott, oversize fit kapucnis pulóver, amely trendy streetwear stílust kölcsönöz. Puha, könnyű anyaga egész évben kellemes viseletet biztosít. Bő fazon, amely nem szorítja a mozgást.",
    category: "Hoodie",
    stock: 12,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "3",
    slug: "zip-hoodie-szurke",
    name: "Zip-Up Hoodie – Szürke",
    price: 15990,
    image: "https://imgur.com/a/YVeP13Y",
    description:
      "Cipzáros kapucnis pulóver klasszikus szürke színben. Két oldalsó zseb, puha belső polár bélés, könnyű layering darab egész évre.",
    category: "Hoodie",
    stock: 10,
    rating: 4.5,
    reviewCount: 42,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
