"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Clock3,
  Eye,
  Globe2,
  MousePointerClick,
  Share2,
  Users,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getSiteVisits, type SiteVisit } from "@/lib/firestoreVisits";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("hu-HU", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function StatCard({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
          {label}
        </p>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700">
          {icon}
        </span>
      </div>
      <p className="font-serif text-3xl font-bold tracking-tight text-stone-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-stone-500">{hint}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getSiteVisits()
        .then(setVisits)
        .finally(() => setFetching(false));
    }
  }, [user]);

  const analytics = useMemo(() => {
    const now = new Date();
    const todayKey = now.toDateString();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyCounts = new Map<string, number>();
    const pageCounts = new Map<string, number>();
    const referrerCounts = new Map<string, number>();
    const visitorIds = new Set<string>();

    let todayVisits = 0;
    let lastSevenDaysVisits = 0;

    for (const visit of visits) {
      visitorIds.add(visit.sessionId);

      const dayKey = visit.createdAt.toDateString();
      dailyCounts.set(dayKey, (dailyCounts.get(dayKey) ?? 0) + 1);
      pageCounts.set(visit.pathname, (pageCounts.get(visit.pathname) ?? 0) + 1);

      if (visit.referrer) {
        let referrerLabel = "Ismeretlen";

        try {
          referrerLabel = new URL(visit.referrer).hostname.replace(/^www\./, "");
        } catch {
          referrerLabel = visit.referrer;
        }

        referrerCounts.set(referrerLabel, (referrerCounts.get(referrerLabel) ?? 0) + 1);
      }

      if (dayKey === todayKey) {
        todayVisits += 1;
      }

      if (visit.createdAt >= sevenDaysAgo) {
        lastSevenDaysVisits += 1;
      }
    }

    const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + index);
      const key = date.toDateString();

      return {
        label: formatShortDate(date),
        count: dailyCounts.get(key) ?? 0,
      };
    });

    const topPages = Array.from(pageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([pathname, count]) => ({ pathname, count }));

    const topReferrers = Array.from(referrerCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));

    return {
      totalVisits: visits.length,
      uniqueVisitors: visitorIds.size,
      todayVisits,
      lastSevenDaysVisits,
      lastSevenDays,
      topPages,
      topReferrers,
      latestVisits: visits.slice(0, 10),
    };
  }, [visits]);

  if (loading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f5f2_0%,#f4efe7_100%)]">
      <header className="border-b border-stone-200/80 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">
              Admin dashboard
            </p>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-950">
              Forgalmi áttekintés
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Termékek
            </Link>
            <Link
              href="/admin/orders"
              className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Rendelések
            </Link>
            <Link
              href="/admin/coupons"
              className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Kuponok
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Összes kattintás"
            value={analytics.totalVisits.toLocaleString("hu-HU")}
            icon={<MousePointerClick className="h-4 w-4" />}
            hint="Minden rögzített pageview az oldalról"
          />
          <StatCard
            label="Egyedi látogatók"
            value={analytics.uniqueVisitors.toLocaleString("hu-HU")}
            icon={<Users className="h-4 w-4" />}
            hint="Külön helyi látogatói azonosító alapján"
          />
          <StatCard
            label="Mai látogatások"
            value={analytics.todayVisits.toLocaleString("hu-HU")}
            icon={<Eye className="h-4 w-4" />}
            hint="A mai napra eső oldalmegnyitások"
          />
          <StatCard
            label="Elmúlt 7 nap"
            value={analytics.lastSevenDaysVisits.toLocaleString("hu-HU")}
            icon={<Clock3 className="h-4 w-4" />}
            hint="A legutóbbi egy hét aktivitása"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                  Napi bontás
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-950">
                  Kattintások az elmúlt 7 napban
                </h2>
              </div>
              <BarChart3 className="h-5 w-5 text-stone-400" />
            </div>

            <div className="space-y-4">
              {analytics.lastSevenDays.map((day) => {
                const max = Math.max(...analytics.lastSevenDays.map((item) => item.count), 1);
                const width = `${Math.max((day.count / max) * 100, day.count > 0 ? 10 : 0)}%`;

                return (
                  <div key={day.label} className="grid gap-2 md:grid-cols-[88px_1fr_48px] md:items-center">
                    <span className="text-sm font-medium text-stone-500">{day.label}</span>
                    <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-stone-900 transition-all"
                        style={{ width }}
                      />
                    </div>
                    <span className="text-right text-sm font-semibold text-stone-900">
                      {day.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-stone-500" />
                <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-950">
                  Legnépszerűbb oldalak
                </h2>
              </div>

              <div className="space-y-3">
                {analytics.topPages.length === 0 ? (
                  <p className="text-sm text-stone-500">Még nincs látogatási adat.</p>
                ) : (
                  analytics.topPages.map((page) => (
                    <div key={page.pathname} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                      <span className="truncate text-sm font-medium text-stone-700">
                        {page.pathname}
                      </span>
                      <span className="ml-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-900 shadow-sm">
                        {page.count}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <Share2 className="h-5 w-5 text-stone-500" />
                <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-950">
                  Források
                </h2>
              </div>

              <div className="space-y-3">
                {analytics.topReferrers.length === 0 ? (
                  <p className="text-sm text-stone-500">Nincs külső hivatkozó adat.</p>
                ) : (
                  analytics.topReferrers.map((referrer) => (
                    <div key={referrer.source} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                      <span className="text-sm font-medium text-stone-700">{referrer.source}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-900 shadow-sm">
                        {referrer.count}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                Legutóbbi aktivitás
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-950">
                Utolsó kattintások
              </h2>
            </div>
            <span className="text-sm text-stone-500">
              {analytics.latestVisits.length} esemény megjelenítve
            </span>
          </div>

          {analytics.latestVisits.length === 0 ? (
            <p className="text-sm text-stone-500">Még nincs rögzített látogatás.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase tracking-widest text-stone-400">
                    <th className="pb-3 pr-4">Időpont</th>
                    <th className="pb-3 pr-4">Oldal</th>
                    <th className="pb-3 pr-4">Forrás</th>
                    <th className="pb-3 pr-4">Látogató</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.latestVisits.map((visit) => (
                    <tr key={visit.id} className="border-b border-stone-100 last:border-b-0">
                      <td className="py-3 pr-4 text-stone-600">{formatDateTime(visit.createdAt)}</td>
                      <td className="py-3 pr-4 font-medium text-stone-900">{visit.pathname}</td>
                      <td className="py-3 pr-4 text-stone-600">
                        {visit.referrer ? (() => {
                          try {
                            return new URL(visit.referrer).hostname.replace(/^www\./, "");
                          } catch {
                            return visit.referrer;
                          }
                        })() : "Közvetlen"}
                      </td>
                      <td className="py-3 pr-4 text-stone-600">
                        {visit.sessionId.slice(0, 8)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}