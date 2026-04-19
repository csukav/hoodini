import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { stripe } from "@/lib/stripe";
import { getOrderById } from "@/lib/firestoreOrders";
import type { Order } from "@/types";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function formatPrice(n: number) {
  return n.toLocaleString("hu-HU") + " Ft";
}

function buildEmailHtml(order: Order): string {
  const itemRows = order.items
    .map(
      (item) => `
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
        <tr>
          <td style="background:#0c0a09;padding:24px 40px;text-align:center;">
            <span style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:4px;font-family:Georgia,serif;">HOODINI</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0c0a09;">Rendelés visszaigazolása</h1>
            <p style="margin:0 0 24px;color:#78716c;font-size:15px;">Köszönjük a vásárlást, <strong>${order.customer.name}</strong>! Megrendelésed megkaptuk és a fizetés sikeres volt.</p>

            <table style="background:#f5f5f4;width:100%;padding:16px;margin-bottom:28px;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:1px;">Rendelési azonosító</td>
                <td style="font-size:12px;color:#0c0a09;font-weight:700;text-align:right;">#${order.id.slice(-8).toUpperCase()}</td>
              </tr>
            </table>

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
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("Webhook: no orderId in session metadata");
      return NextResponse.json({ error: "No orderId" }, { status: 400 });
    }

    // Update order status to confirmed + save stripeSessionId
    await updateDoc(doc(db, "orders", orderId), {
      status: "confirmed",
      stripeSessionId: session.id,
      updatedAt: serverTimestamp(),
    });

    // Fetch the full order for the email
    const order = await getOrderById(orderId);

    // Send confirmation email
    if (order) {
      try {
        await transporter.sendMail({
          from: `"Hoodini" <${process.env.GMAIL_USER}>`,
          to: order.customer.email,
          subject: `Rendelés visszaigazolás – #${orderId.slice(-8).toUpperCase()}`,
          html: buildEmailHtml(order),
        });
      } catch (emailErr) {
        console.error("Email sending failed (order saved):", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
