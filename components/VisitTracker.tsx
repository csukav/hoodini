"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordSiteVisit } from "@/lib/firestoreVisits";

const trackedVisits = new Set<string>();
const VISITOR_STORAGE_KEY = "hoodini_visitor_id";

function getVisitorId() {
  if (typeof window === "undefined") return "anonymous";

  const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (existing) return existing;

  const visitorId = window.crypto.randomUUID();
  window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
  return visitorId;
}

export default function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const query = searchParams.toString();
    const visitKey = query ? `${pathname}?${query}` : pathname;

    if (trackedVisits.has(visitKey)) {
      return;
    }

    trackedVisits.add(visitKey);

    void recordSiteVisit({
      pathname,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      sessionId: getVisitorId(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      language: typeof navigator !== "undefined" ? navigator.language : undefined,
    }).catch((error) => {
      console.error("Failed to record site visit:", error);
    });
  }, [pathname, searchParams]);

  return null;
}