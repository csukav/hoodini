import { NextRequest, NextResponse } from "next/server";
import {
  getCouponByCode,
  validateCoupon,
  calculateDiscount,
} from "@/lib/firestoreCoupons";

export async function POST(request: NextRequest) {
  try {
    const { code, orderTotal } = await request.json();

    if (!code || !orderTotal) {
      return NextResponse.json(
        { error: "Kupon kód és rendelési összeg szükséges" },
        { status: 400 }
      );
    }

    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return NextResponse.json(
        { error: "Érvénytelen kupon kód" },
        { status: 404 }
      );
    }

    const validation = validateCoupon(coupon, orderTotal);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const discountAmount = calculateDiscount(coupon, orderTotal);

    return NextResponse.json({
      valid: true,
      couponId: coupon.id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      description: coupon.description,
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { error: "Hiba a kupon validálása során" },
      { status: 500 }
    );
  }
}
