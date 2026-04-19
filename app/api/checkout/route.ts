import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { OrderItem } from "@/types";

const SHIPPING_THRESHOLD = 15_000;
const SHIPPING_COST = 1_490;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { customer, shippingAddress, items, note } = body as {
      customer: { name: string; email: string; phone: string };
      shippingAddress: { zip: string; city: string; address: string };
      items: OrderItem[];
      note?: string;
    };

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !shippingAddress?.zip ||
      !shippingAddress?.city ||
      !shippingAddress?.address ||
      !items?.length
    ) {
      return NextResponse.json(
        { error: "Hiányzó kötelező mezők." },
        { status: 400 },
      );
    }

    const subtotal = items.reduce(
      (sum: number, i: OrderItem) => sum + i.price * i.quantity,
      0,
    );
    const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "huf",
        product_data: {
          name: item.productName,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "huf",
          product_data: { name: "Szállítási költség" },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customer.email,
      line_items: lineItems,
      metadata: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingZip: shippingAddress.zip,
        shippingCity: shippingAddress.city,
        shippingAddress: shippingAddress.address,
        note: note ?? "",
        items: JSON.stringify(items),
        subtotal: subtotal.toString(),
        shippingCost: shippingCost.toString(),
        total: (subtotal + shippingCost).toString(),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ismeretlen hiba";
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "Hiba a fizetési munkamenet létrehozásakor.", details: message },
      { status: 500 },
    );
  }
}
