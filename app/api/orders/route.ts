import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createOrder } from "@/lib/firestoreOrders";
import type { OrderInput } from "@/lib/firestoreOrders";
import type { OrderItem } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

// Ha a domain még nincs hitelesítve Resend-ben, a RESEND_FROM és RESEND_TEST_TO
// env változókkal konfigurálható. Hitelesített domain után töröld a RESEND_TEST_TO-t.
const FROM_EMAIL = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const TEST_TO = process.env.RESEND_TEST_TO ?? null; // pl. csukav@gmail.com tesztnél

const SHIPPING_THRESHOLD = 15_000;
const SHIPPING_COST = 1_490;

function formatPrice(n: number) {
  return n.toLocaleString("hu-HU") + " Ft";
}

function buildEmailHtml(orderId: string, order: OrderInput): string {
  const itemRows = order.items
    .map(
      (item: OrderItem) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e7e5e4;">
          ${item.image ? `<img src="${item.image}" alt="${item.productName}" width="56" height="56" style="object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:12px;" />` : ""}
          <span style="font-weight:600;">${item.productName}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #e7e5e4;text-align:center;color:#78716c;">${item.quantity} db</td>
        <td style="padding:10px 0;border-bottom:1px solid #e7e5e4;text-align:right;font-weight:600;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">
        <!-- Header -->
        <tr>
          <td style="background:#0c0a09;padding:24px 40px;text-align:center;">
            <span style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:4px;font-family:Georgia,serif;">HOODINI</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0c0a09;">Rendelés visszaigazolása</h1>
            <p style="margin:0 0 24px;color:#78716c;font-size:15px;">Köszönjük a vásárlást, <strong>${order.customer.name}</strong>! Megrendelésed megkaptuk.</p>

            <table style="background:#f5f5f4;width:100%;padding:16px;margin-bottom:28px;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;">Rendelési azonosító</td>
                <td style="font-size:12px;color:#0c0a09;font-weight:700;text-align:right;">#${orderId.slice(-8).toUpperCase()}</td>
              </tr>
            </table>

            <!-- Items -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th style="text-align:left;font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #e7e5e4;">Termék</th>
                  <th style="text-align:center;font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #e7e5e4;">Mennyiség</th>
                  <th style="text-align:right;font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #e7e5e4;">Ár</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>

            <!-- Totals -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr>
                <td style="color:#78716c;font-size:14px;padding:4px 0;">Részösszeg</td>
                <td style="text-align:right;font-size:14px;color:#44403c;padding:4px 0;">${formatPrice(order.subtotal)}</td>
              </tr>
              <tr>
                <td style="color:#78716c;font-size:14px;padding:4px 0;">Szállítás</td>
                <td style="text-align:right;font-size:14px;${order.shippingCost === 0 ? "color:#16a34a;" : "color:#44403c;"}padding:4px 0;">${order.shippingCost === 0 ? "Ingyenes" : formatPrice(order.shippingCost)}</td>
              </tr>
              <tr>
                <td style="font-size:16px;font-weight:800;color:#0c0a09;padding-top:12px;border-top:2px solid #e7e5e4;">Végösszeg</td>
                <td style="text-align:right;font-size:16px;font-weight:800;color:#0c0a09;padding-top:12px;border-top:2px solid #e7e5e4;">${formatPrice(order.total)}</td>
              </tr>
            </table>

            <!-- Shipping -->
            <table style="background:#f5f5f4;width:100%;padding:16px;margin-top:28px;" cellpadding="0" cellspacing="0">
              <tr><td colspan="2" style="font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;">Szállítási cím</td></tr>
              <tr>
                <td style="font-size:14px;color:#44403c;">
                  ${order.customer.name}<br/>
                  ${order.shippingAddress.zip} ${order.shippingAddress.city}<br/>
                  ${order.shippingAddress.address}
                </td>
              </tr>
            </table>

            ${order.note ? `<p style="margin-top:20px;font-size:13px;color:#78716c;font-style:italic;">Megjegyzés: ${order.note}</p>` : ""}

            <p style="margin-top:32px;font-size:14px;color:#78716c;">Ha kérdésed van, írj a <a href="mailto:hello@hoodini.hu" style="color:#0c0a09;">hello@hoodini.hu</a> e-mail-címre.</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f5f5f4;padding:20px 40px;text-align:center;font-size:12px;color:#a8a29e;">
            © ${new Date().getFullYear()} Hoodini · Minden jog fenntartva
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      return NextResponse.json(
        { error: "Érvénytelen e-mail cím." },
        { status: 400 },
      );
    }

    const subtotal = items.reduce(
      (sum: number, i: OrderItem) => sum + i.price * i.quantity,
      0,
    );
    const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;

    const orderInput: OrderInput = {
      status: "pending",
      customer,
      shippingAddress,
      items,
      subtotal,
      shippingCost,
      total,
      note: note ?? "",
    };

    const orderId = await createOrder(orderInput);

    // Email küldés – nem blokkoljuk a rendelés sikerét, ha hiba van
    try {
      const emailResult = await resend.emails.send({
        from: `Hoodini <${FROM_EMAIL}>`,
        to: TEST_TO ?? customer.email,
        subject: `Rendelés visszaigazolás – #${orderId.slice(-8).toUpperCase()}`,
        html: buildEmailHtml(orderId, orderInput),
      });
      if (emailResult.error) {
        console.error("Resend email error:", emailResult.error);
      }
    } catch (emailErr) {
      console.error("Email sending failed (order saved):", emailErr);
    }

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { error: "Szerverhiba a rendelés feldolgozásakor." },
      { status: 500 },
    );
  }
}
