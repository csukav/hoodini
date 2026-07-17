import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COL = "siteVisits";

export interface SiteVisit {
  id: string;
  pathname: string;
  referrer?: string;
  sessionId: string;
  userAgent?: string;
  language?: string;
  createdAt: Date;
}

function toVisit(id: string, data: DocumentData): SiteVisit {
  return {
    id,
    pathname: data.pathname ?? "/",
    referrer: data.referrer ?? undefined,
    sessionId: data.sessionId ?? "unknown",
    userAgent: data.userAgent ?? undefined,
    language: data.language ?? undefined,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt ?? 0),
  };
}

export async function recordSiteVisit(input: {
  pathname: string;
  referrer?: string;
  sessionId: string;
  userAgent?: string;
  language?: string;
}): Promise<void> {
  await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export async function getSiteVisits(): Promise<SiteVisit[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => toVisit(d.id, d.data()));
}