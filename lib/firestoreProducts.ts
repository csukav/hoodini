import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types";

const COL = "products";

function toProduct(id: string, data: DocumentData): Product {
  return {
    id,
    slug: data.slug ?? "",
    name: data.name ?? "",
    price: data.price ?? 0,
    image: data.image ?? "",
    description: data.description ?? "",
    category: data.category ?? "",
    stock: data.stock ?? 0,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
  };
}

/** Fetch all products ordered by name */
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy("name")));
  return snap.docs.map((d) => toProduct(d.id, d.data()));
}

/** Fetch a single product by Firestore document ID */
export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return toProduct(snap.id, snap.data());
}

/** Fetch a single product by slug field */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { query: q, where } = await import("firebase/firestore");
  const snap = await getDocs(q(collection(db, COL), where("slug", "==", slug)));
  if (snap.empty) return null;
  const d = snap.docs[0];
  return toProduct(d.id, d.data());
}

export type ProductInput = Omit<Product, "id">;

/** Create a new product – returns the new document ID */
export async function createProduct(data: ProductInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing product */
export async function updateProduct(
  id: string,
  data: Partial<ProductInput>,
): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
