import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { subscribeNewsletter } from "@/lib/firestoreNewsletter";
import { getCoupons, createCoupon } from "@/lib/firestoreCoupons";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Helper function to generate coupon code
function generateCouponCode(): string {
  const prefix = "WELCOME";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${random}`;
}

// Helper function to build newsletter email HTML
function buildNewsletterEmailHtml(
  couponCode: string,
  discountValue: number
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background: linear-gradient(to right, #ff6b35 0%, #ff8c42 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .coupon-box {
            background: linear-gradient(135deg, #fef3c7 0%, #ffe4b5 100%);
            border: 2px dashed #ff6b35;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
            border-radius: 8px;
          }
          .coupon-code {
            font-size: 36px;
            font-weight: bold;
            color: #ff6b35;
            font-family: 'Courier New', monospace;
            letter-spacing: 2px;
            margin: 15px 0;
          }
          .discount-info {
            font-size: 18px;
            color: #555;
            margin-top: 10px;
          }
          .button {
            display: inline-block;
            background-color: #ff6b35;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .info-list {
            margin: 20px 0;
            padding-left: 20px;
          }
          .info-list li {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Üdvözlünk a Hoodini családban!</h1>
            <p>Köszi hogy feliratkoztál az ajánlatokra</p>
          </div>
          <div class="content">
            <p>Szia!</p>
            <p>Fantasztikus, hogy csatlakoztál a Hoodini közösséghez! Itt az eddényed az első vásárlásodhoz egy exkluzív kupon kód:</p>
            
            <div class="coupon-box">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">A te kupon kódod:</p>
              <div class="coupon-code">${couponCode}</div>
              <div class="discount-info">${discountValue}% kedvezmény az első rendelésnél!</div>
            </div>

            <p><strong>Hogyan használd:</strong></p>
            <ul class="info-list">
              <li>Válassz kedvenc hoodie-id vagy máris szükséges termékeid</li>
              <li>Végezd el a vásárlást</li>
              <li>A kosár mellett add meg a kupon kódot: <strong>${couponCode}</strong></li>
              <li>A kedvezmény automatikusan érvényesülni fog</li>
            </ul>

            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://hoodini.hu"}" class="button">KEZDJ VÁSÁRLÁSNAK</a>
            </p>

            <p style="margin-top: 30px; color: #666;">
              Ha kérdéseid vannak, írj nekünk az <strong>info@hoodini.hu</strong> email címre.
            </p>

            <div class="footer">
              <p>Hoodini - Minőségi divat, megfizethetőbb áron</p>
              <p>© 2024 Hoodini. Minden jog fenntartva.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Érvénytelen email cím" },
        { status: 400 }
      );
    }

    // Subscribe user to newsletter
    await subscribeNewsletter(email);

    // Generate coupon code
    const couponCode = generateCouponCode();
    const discountValue = 15; // 15% discount

    // Check if coupon already exists
    const allCoupons = await getCoupons();
    const couponExists = allCoupons.some((c) => c.code === couponCode);

    if (!couponExists) {
      // Add coupon to Firestore
      await createCoupon({
        code: couponCode,
        description: `Newsletter Welcome Coupon`,
        discountType: "percentage",
        discountValue: discountValue,
        maxUsageCount: 1,
        isActive: true,
        minOrderValue: 0,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
    }

    // Send email with coupon
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "🎉 Üdvözlünk a Hoodini-ben - Itt a te kupon kódod!",
      html: buildNewsletterEmailHtml(couponCode, discountValue),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sikeres feliratkozás! Ellenőrizd az emailed.",
        couponCode: couponCode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error instanceof Error) {
      if (error.message.includes("már feliratkozott")) {
        return NextResponse.json(
          { error: "Ez az email már feliratkozott" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Feliratkozás sikertelen. Kérjük próbáld újra később." },
      { status: 500 }
    );
  }
}
