import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Coupon } from "@/types";

const COUPONS_COLLECTION = "coupons";

export async function getCoupons(): Promise<Coupon[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COUPONS_COLLECTION));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        code: data.code,
        description: data.description,
        discountType: data.discountType,
        discountValue: data.discountValue,
        maxUsageCount: data.maxUsageCount,
        currentUsageCount: data.currentUsageCount || 0,
        expiresAt: data.expiresAt?.toDate?.(),
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        minOrderValue: data.minOrderValue,
      } as Coupon;
    });
  } catch (error) {
    console.error("Error getting coupons:", error);
    throw error;
  }
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  try {
    const q = query(
      collection(db, COUPONS_COLLECTION),
      where("code", "==", code.toUpperCase())
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      code: data.code,
      description: data.description,
      discountType: data.discountType,
      discountValue: data.discountValue,
      maxUsageCount: data.maxUsageCount,
      currentUsageCount: data.currentUsageCount || 0,
      expiresAt: data.expiresAt?.toDate?.(),
      isActive: data.isActive,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      minOrderValue: data.minOrderValue,
    } as Coupon;
  } catch (error) {
    console.error("Error getting coupon by code:", error);
    throw error;
  }
}

export async function createCoupon(
  coupon: Omit<Coupon, "id" | "currentUsageCount" | "createdAt">
): Promise<string> {
  try {
    const docRef = doc(collection(db, COUPONS_COLLECTION));
    const timestamp = new Date();

    await setDoc(docRef, {
      code: coupon.code.toUpperCase(),
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxUsageCount: coupon.maxUsageCount || null,
      currentUsageCount: 0,
      expiresAt: coupon.expiresAt || null,
      isActive: coupon.isActive,
      minOrderValue: coupon.minOrderValue || null,
      createdAt: timestamp,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
}

export async function updateCoupon(
  id: string,
  updates: Partial<Omit<Coupon, "id" | "createdAt">>
): Promise<void> {
  try {
    const docRef = doc(db, COUPONS_COLLECTION, id);
    const updateData: any = { ...updates };

    if (updates.code) {
      updateData.code = updates.code.toUpperCase();
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating coupon:", error);
    throw error;
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COUPONS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting coupon:", error);
    throw error;
  }
}

export async function incrementCouponUsage(id: string): Promise<void> {
  try {
    const docRef = doc(db, COUPONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Coupon not found");
    }

    const currentCount = docSnap.data().currentUsageCount || 0;
    await updateDoc(docRef, {
      currentUsageCount: currentCount + 1,
    });
  } catch (error) {
    console.error("Error incrementing coupon usage:", error);
    throw error;
  }
}

export function validateCoupon(coupon: Coupon, orderTotal: number): {
  valid: boolean;
  error?: string;
} {
  if (!coupon.isActive) {
    return { valid: false, error: "Ez a kupon inaktív." };
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return { valid: false, error: "Ez a kupon lejárt." };
  }

  if (
    coupon.maxUsageCount &&
    coupon.currentUsageCount >= coupon.maxUsageCount
  ) {
    return { valid: false, error: "Ez a kupon használatának száma elérte a maximumot." };
  }

  if (coupon.minOrderValue && orderTotal < coupon.minOrderValue) {
    return {
      valid: false,
      error: `Minimum rendelési érték: ${coupon.minOrderValue} Ft`,
    };
  }

  return { valid: true };
}

export function calculateDiscount(coupon: Coupon, amount: number): number {
  if (coupon.discountType === "percentage") {
    return Math.round((amount * coupon.discountValue) / 100);
  } else {
    return coupon.discountValue;
  }
}
