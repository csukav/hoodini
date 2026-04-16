"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { OrderItem } from "@/types";

const SHIPPING_THRESHOLD = 15_000;
const SHIPPING_COST = 1_490;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();

  const shippingCost = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = totalPrice + shippingCost;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    city: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Kötelező mező.";
    if (!form.email.trim()) e.email = "Kötelező mező.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Érvénytelen e-mail cím.";
    if (!form.phone.trim()) e.phone = "Kötelező mező.";
    if (!form.zip.trim()) e.zip = "Kötelező mező.";
    if (!form.city.trim()) e.city = "Kötelező mező.";
    if (!form.address.trim()) e.address = "Kötelező mező.";
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          shippingAddress: {
            zip: form.zip.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
          },
          items: orderItems,
          note: form.note.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error ?? "Ismeretlen hiba.");
        setLoading(false);
        return;
      }

      const { orderId } = await res.json();
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch {
      setServerError("Hálózati hiba. Próbáld újra.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center">
        <Package className="w-14 h-14 mx-auto mb-4 text-stone-300" />
        <h2 className="text-2xl font-bold text-stone-950 mb-2">
          A kosarad üres
        </h2>
        <p className="text-stone-500 mb-8">
          Adj termékeket a kosárhoz a vásárláshoz.
        </p>
        <Link
          href="/products"
          className="btn-dark inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Termékek böngészése
        </Link>
      </div>
    );
  }

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    autoComplete,
  }: {
    label: string;
    name: keyof typeof form;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
  }) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full border ${errors[name] ? "border-red-400" : "border-stone-300"} bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Vissza a kosárhoz
      </Link>

      <h1 className="text-3xl font-black text-stone-950 mb-10">Pénztár</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal data */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-950 mb-4 pb-2 border-b border-stone-200">
                Személyes adatok
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field
                    label="Teljes név *"
                    name="name"
                    autoComplete="name"
                    placeholder="Kovács János"
                  />
                </div>
                <Field
                  label="E-mail cím *"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="pelda@email.hu"
                />
                <Field
                  label="Telefonszám *"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+36 30 123 4567"
                />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-950 mb-4 pb-2 border-b border-stone-200">
                Szállítási cím
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Irányítószám *"
                  name="zip"
                  autoComplete="postal-code"
                  placeholder="1011"
                />
                <Field
                  label="Város *"
                  name="city"
                  autoComplete="address-level2"
                  placeholder="Budapest"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Cím (utca, házszám) *"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Fő utca 1."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">
                    Megjegyzés (opcionális)
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Pl. kapucsengő neve, emeleti lakás száma..."
                    className="w-full border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 resize-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right: summary */}
          <aside className="lg:col-span-1">
            <div className="border border-stone-200 bg-stone-50 p-6 sticky top-24">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-950 mb-5">
                Rendelés összegzése
              </h2>

              <ul className="space-y-3 mb-5">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex justify-between items-start text-sm"
                  >
                    <span className="text-stone-600 pr-2">
                      {item.product.name}{" "}
                      <span className="text-stone-400">× {item.quantity}</span>
                    </span>
                    <span className="font-semibold text-stone-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2 text-sm border-t border-stone-200 pt-4">
                <div className="flex justify-between text-stone-500">
                  <dt>Részösszeg ({totalItems} db)</dt>
                  <dd className="font-medium text-stone-800">
                    {formatPrice(totalPrice)}
                  </dd>
                </div>
                <div className="flex justify-between text-stone-500">
                  <dt>Szállítás</dt>
                  <dd
                    className={
                      shippingCost === 0
                        ? "font-medium text-emerald-600"
                        : "font-medium text-stone-800"
                    }
                  >
                    {shippingCost === 0
                      ? "Ingyenes"
                      : formatPrice(shippingCost)}
                  </dd>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-stone-200">
                  <span className="font-bold text-stone-950">Végösszeg</span>
                  <span className="text-xl font-black text-stone-950">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </dl>

              {serverError && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full mt-6 justify-center flex items-center gap-2 py-3.5 disabled:opacity-60"
              >
                {loading ? "Feldolgozás..." : "Megrendelés elküldése"}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Biztonságos fizetés – SSL titkosítással védve
              </p>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
