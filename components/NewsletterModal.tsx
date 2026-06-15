"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if user already subscribed (localStorage)
  useEffect(() => {
    const subscribed = localStorage.getItem("hoodini_newsletter_subscribed");
    if (subscribed) {
      setHasSubscribed(true);
    } else {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessageType("error");
      setMessage("Kérjük add meg az email címed");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Hiba történt");
      }

      setMessageType("success");
      setMessage("Sikeres feliratkozás! Ellenőrizd az emailed a kuponért.");
      setEmail("");

      // Mark as subscribed
      localStorage.setItem("hoodini_newsletter_subscribed", "true");

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error ? error.message : "Feliratkozás sikertelen"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-2">Iratkozz fel az ajánlatokért!</h2>
            <p className="text-orange-100 text-sm">
              Kapsz egy exkluzív kupon kódot az első vásárlásodhoz
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email cím
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="neved@email.com"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm text-center font-medium ${
                    messageType === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Feldolgozás..." : "Iratkozz fel!"}
              </button>

              <p className="text-xs text-center text-gray-500">
                Nyilvántartásba vételed nyomán hozzájárulok az adatkezeléshez
              </p>
            </form>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Mit kapsz:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-600">
                    Exkluzív kupon kód az első vásárlásodhoz
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-600">
                    Első szerzési információk az új termékekről
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-600">
                    Speciális akciók és kedvezmények
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
