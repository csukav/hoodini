import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garancia és minőség",
  description: "Ismerd meg a Hoodini garancia feltételeit. Minőségi termékek, hosszú távú garancia minden vásárláshoz.",
};

export default function GaranciaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Garancia és minőség
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          A Hoodini prémium minőségű termékeket kínál, amelyekre teljes garanciát vállalunk.
          Elkötelezettek vagyunk a hosszú távú elégedettség és a fenntarthatóság mellett.
        </p>

        <h2 className="text-2xl font-bold mb-4">Termék garancia</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>2 év teljes garancia minden termékre</li>
          <li>Anyagi hibák esetén azonnali csere vagy visszatérítés</li>
          <li>Szállítási sérülések esetén teljes kártérítés</li>
          <li>Minőségi anyagok és gondos varrás</li>
          <li>OEKO-TEX szabványú szövetek</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Minőségi ígéretek</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Prémium anyagok</h3>
            <p className="text-stone-600">
              Csak a legjobb minőségű pamut, poliészter és keverékek.
              Minden termék többszörös minőségellenőrzésen esik át.
            </p>
          </div>
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Gondos kivitel</h3>
            <p className="text-stone-600">
              Kézi varrás és professzionális minőségellenőrzés.
              Minden termék egyedi címkézéssel és gondos csomagolással.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Hogyan érvényesítsd a garanciát?</h2>
        <ol className="list-decimal pl-6 mb-8 space-y-2">
          <li>Gyűjtse össze a vásárlási bizonylatot</li>
          <li>Fotózza le a hibát vagy sérülést</li>
          <li>Írj nekünk a garancia@hoodini.hu címre</li>
          <li>Küldjük a garancia kérelmet</li>
          <li>Átvesszük a terméket és 5 munkanapon belül megoldjuk</li>
        </ol>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Kérdésed van?</h3>
          <p className="mb-4">
            Ha bármilyen kérdésed van a garanciával kapcsolatban,
            írj nekünk a hello@hoodini.hu címre vagy használd az oldal alján lévő chat-et.
          </p>
        </div>
      </div>
    </div>
  );
}