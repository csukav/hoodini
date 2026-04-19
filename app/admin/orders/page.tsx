"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getOrders, updateOrderStatus } from "@/lib/firestoreOrders";
import type { Order, OrderStatus } from "@/types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Függőben",
  confirmed: "Visszaigazolva",
  shipped: "Kiszállítva",
  delivered: "Átadva",
  cancelled: "Lemondva",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

function formatPrice(n: number) {
  return n.toLocaleString("hu-HU") + " Ft";
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function OrderRow({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, s: OrderStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const s = e.target.value as OrderStatus;
    setUpdating(true);
    await updateOrderStatus(order.id, s);
    onStatusChange(order.id, s);
    setUpdating(false);
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex flex-wrap items-center gap-3 px-5 py-4 text-left hover:bg-stone-50 transition-colors"
      >
        <span className="font-mono text-xs text-stone-400 w-24 shrink-0">
          #{order.id.slice(-8).toUpperCase()}
        </span>
        <span className="font-semibold text-sm text-stone-900 flex-1 min-w-0 truncate">
          {order.customer.name}
        </span>
        <span className="text-xs text-stone-400 shrink-0">
          {formatDate(order.createdAt)}
        </span>
        <span className="font-bold text-sm text-stone-900 shrink-0">
          {formatPrice(order.total)}
        </span>
        <StatusBadge status={order.status} />
        {order.stripeSessionId ? (
          <span className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700">
            Fizetve
          </span>
        ) : (
          <span className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-orange-100 text-orange-700">
            Nincs fizetve
          </span>
        )}
        {open ? (
          <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
        )}
      </button>

      {/* Expanded details */}
      {open && (
        <div className="border-t border-stone-100 px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer & address */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Vevő adatok
            </h3>
            <p className="text-sm text-stone-700 mb-0.5">
              <span className="font-medium">Név:</span> {order.customer.name}
            </p>
            <p className="text-sm text-stone-700 mb-0.5">
              <span className="font-medium">E-mail:</span>{" "}
              <a
                href={`mailto:${order.customer.email}`}
                className="underline hover:text-stone-950"
              >
                {order.customer.email}
              </a>
            </p>
            <p className="text-sm text-stone-700 mb-4">
              <span className="font-medium">Telefon:</span>{" "}
              {order.customer.phone}
            </p>

            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Szállítási cím
            </h3>
            <p className="text-sm text-stone-700">
              {order.shippingAddress.zip} {order.shippingAddress.city},{" "}
              {order.shippingAddress.address}
            </p>
            {order.note && (
              <p className="mt-2 text-xs text-stone-500 italic">
                Megjegyzés: {order.note}
              </p>
            )}
          </div>

          {/* Items & totals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Rendelt termékek
            </h3>
            <ul className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-stone-700">
                    {item.productName}{" "}
                    <span className="text-stone-400">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-stone-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-stone-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Részösszeg</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Szállítás</span>
                <span>
                  {order.shippingCost === 0
                    ? "Ingyenes"
                    : formatPrice(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Végösszeg</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Status change */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Fizetés:
                </span>
                {order.stripeSessionId ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Sikeres (Stripe)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Nincs online fizetés
                  </span>
                )}
              </div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1.5">
                Státusz módosítása
              </label>
              <select
                value={order.status}
                onChange={handleStatus}
                disabled={updating}
                className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 disabled:opacity-60"
              >
                {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              {updating && (
                <p className="mt-1 text-xs text-stone-400">Mentés...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  const { user, loading, signOut } = useAdminAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getOrders()
        .then(setOrders)
        .finally(() => setFetching(false));
    }
  }, [user]);

  function handleStatusChange(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  async function handleSignOut() {
    await signOut();
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  if (loading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top navbar */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <span className="font-serif text-xl font-bold tracking-tight">
            Hoodini Admin
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Termékek
            </Link>
            <button
              onClick={handleSignOut}
              className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Header + filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Rendelések{" "}
            <span className="text-base font-normal text-stone-400">
              ({orders.length})
            </span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Keresés (név, e-mail, ID)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-52 border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "all")
              }
              className="border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
            >
              <option value="all">Minden státusz</option>
              {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => {
            const count = orders.filter((o) => o.status === s).length;
            return (
              <button
                key={s}
                onClick={() =>
                  setStatusFilter((prev) => (prev === s ? "all" : s))
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  statusFilter === s
                    ? STATUS_COLORS[s] + " border-transparent"
                    : "border-stone-200 text-stone-500 bg-white hover:border-stone-400"
                }`}
              >
                {STATUS_LABELS[s]}: {count}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-white py-24 text-center">
            <p className="text-stone-400">Még nincsenek rendelések.</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-stone-400">
            Nincs találat a szűrőkre.
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
