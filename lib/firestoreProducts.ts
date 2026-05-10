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

function isPermissionError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string" &&
    ((error as { code: string }).code === "permission-denied" ||
      (error as { code: string }).code === "unauthenticated")
  );
}

function formatFirestoreWriteError(error: unknown) {
  if (isPermissionError(error)) {
    return new Error(
      "A Firestore rules jelenleg nem engedik az admin mentest. Engedelyezd az authenticated admin write-okat a Firebase Console Firestore rules reszen.",
    );
  }

  return error instanceof Error
    ? error
    : new Error("Ismeretlen Firestore hiba.");
}

function toProduct(id: string, data: DocumentData): Product {
  const image = data.image ?? "";
  const images = Array.isArray(data.images)
    ? data.images
    : image
      ? [image]
      : [];

  return {
    id,
    slug: data.slug ?? "",
    name: data.name ?? "",
    price: data.price ?? 0,
    image,
    images,
    description: data.description ?? "",
    category: data.category ?? "",
    stock: data.stock ?? 0,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
    sizes: data.sizes ?? [],
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
  try {
    const ref = await addDoc(collection(db, COL), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (error) {
    throw formatFirestoreWriteError(error);
  }
}

/** Update an existing product */
export async function updateProduct(
  id: string,
  data: Partial<ProductInput>,
): Promise<void> {
  try {
    await updateDoc(doc(db, COL, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw formatFirestoreWriteError(error);
  }
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COL, id));
  } catch (error) {
    throw formatFirestoreWriteError(error);
  }
}
