"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

const faqs: { question: string; answer: string }[] = [
  {
    question: "Mennyi idő alatt érkezik meg a csomagom?",
    answer:
      "Magyarországon belül a megrendeléstől számított 2–4 munkanapon belül kiszállítjuk a csomagodat. Sürgős esetben kérj expressz szállítást a pénztárnál.",
  },
  {
    question: "Ingyenes-e a szállítás?",
    answer:
      "Igen! 15 000 Ft feletti rendelésnél a szállítás teljesen ingyenes. Ez alatti összegnél a szállítási költség 1 490 Ft.",
  },
  {
    question: "Hogyan tudom visszaküldeni a terméket?",
    answer:
      "30 napon belül visszaküldheted a fel nem vett, eredeti csomagolásban lévő termékeket. Küldj e-mailt a visszakuldes@hoodini.hu címre, mi pedig küldünk egy prepaid visszaküldési címkét.",
  },
  {
    question: "Mikor kapom vissza a pénzemet visszaküldés esetén?",
    answer:
      "A visszaküldött csomag beérkezésétől számított 5 munkanapon belül visszautaljuk a vételárat az eredeti fizetési módra.",
  },
  {
    question: "Milyen méretekben kaphatók a termékek?",
    answer:
      "Termékeinket XS–3XL méretben kínáljuk. Minden termékoldal tartalmaz részletes mérettáblázatot cm-es adatokkal, hogy biztosan megtaláld a tökéletes fittinget.",
  },
  {
    question: "Hogyan válasszam ki a megfelelő méretet?",
    answer:
      "Javasoljuk, hogy mérj le magad (mell, csípő, hossz), majd hasonlítsd össze a termékoldal mérettáblázatával. Ha bizonytalan vagy, válaszd a nagyobb méretet – ill. írj nekünk bátran!",
  },
  {
    question: "Hogyan kell mosni a ruhákat?",
    answer:
      "Termékeinket 30°C-on, kíméletes programon javasoljuk mosni, fordítva. Fehérítő és szárítógép használata nem ajánlott a minőség megőrzése érdekében.",
  },
  {
    question: "Tudok módosítani vagy lemondani egy megrendelést?",
    answer:
      "A rendelés leadásától számított 1 órán belül tudunk módosítani vagy törölni. Vedd fel velünk a kapcsolatot a hello@hoodini.hu e-mail-címen vagy az oldalon lévő chat-en.",
  },
  {
    question: "Milyen fizetési módokat fogadtok el?",
    answer:
      "Elfogadjuk a bankkártyás fizetést (Visa, Mastercard, Amex), az Apple Pay-t, a Google Pay-t, valamint az utánvétes fizetést.",
  },
  {
    question: "Van-e fizikai boltotok?",
    answer:
      "Jelenleg csak online értékesítünk, de pop-up eseményeinken személyesen is találkozhatsz a kollekciónkkal. Kövesd Instagram-oldalunkat a legfrissebb információkért.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-stone-950 hover:text-stone-700 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-base sm:text-lg">{question}</span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-stone-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-stone-600 text-sm sm:text-base leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
      {/* Header */}
      <p className="label-xs text-stone-500 mb-1 uppercase tracking-widest text-xs font-medium">
        Segítség
      </p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-3">
        Gyakran Ismételt Kérdések
      </h1>
      <p className="text-stone-500 text-sm sm:text-base mb-12">
        Nem találod a választ? Írj nekünk a{" "}
        <a
          href="mailto:hello@hoodini.hu"
          className="underline underline-offset-2 hover:text-stone-950 transition-colors"
        >
          hello@hoodini.hu
        </a>{" "}
        e-mail-címre.
      </p>

      {/* FAQ accordion */}
      <div className="divide-y divide-stone-200 border-t border-stone-200">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 rounded-2xl bg-stone-950 text-stone-50 px-8 py-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Még mindig kérdésed van?</h2>
        <p className="text-stone-400 text-sm mb-6">
          Csapatunk munkanapokon 9–17 óra között elérhető.
        </p>
        <a
          href="mailto:hello@hoodini.hu"
          className="inline-block bg-stone-50 text-stone-950 text-sm font-medium px-6 py-3 hover:bg-stone-200 transition-colors"
        >
          Kapcsolatfelvétel
        </a>
      </div>
    </div>
  );
}
