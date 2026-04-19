import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Order, OrderItem, OrderStatus } from "@/types";

const COL = "orders";

function toOrder(id: string, data: DocumentData): Order {
  return {
    id,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt ?? 0),
    status: data.status ?? "pending",
    customer: {
      name: data.customer?.name ?? "",
      email: data.customer?.email ?? "",
      phone: data.customer?.phone ?? "",
    },
    shippingAddress: {
      zip: data.shippingAddress?.zip ?? "",
      city: data.shippingAddress?.city ?? "",
      address: data.shippingAddress?.address ?? "",
    },
    items: (data.items ?? []) as OrderItem[],
    subtotal: data.subtotal ?? 0,
    shippingCost: data.shippingCost ?? 0,
    total: data.total ?? 0,
    note: data.note ?? "",
    stripeSessionId: data.stripeSessionId ?? undefined,
  };
}

export async function getOrders(): Promise<Order[]> {
  const snap = await getDocs(
    query(collection(db, COL), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => toOrder(d.id, d.data()));
}

export async function getOrderById(id: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return toOrder(snap.id, snap.data());
}

export type OrderInput = Omit<Order, "id" | "createdAt">;

export async function createOrder(data: OrderInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<void> {
  await updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() });
}
