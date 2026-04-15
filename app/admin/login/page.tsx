"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const { signIn } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      // Set a simple session indicator cookie so middleware can check it
      await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: "authenticated" }),
      });
      router.push("/admin");
    } catch {
      setError("Hibás e-mail cím vagy jelszó.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8 shadow-sm">
        <h1 className="mb-6 font-serif text-2xl font-bold tracking-tight">
          Admin belépés
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-stone-500">
              E-mail cím
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-stone-500">
              Jelszó
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 py-2.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? "Betöltés..." : "Belépés"}
          </button>
        </form>
      </div>
    </div>
  );
}
