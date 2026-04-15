import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export const metadata = {
  title: "Admin – Hoodini",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-stone-100 text-stone-900">{children}</div>
    </AdminAuthProvider>
  );
}
