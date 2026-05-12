import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fenntarthatóság",
  description: "Ismerd meg a Hoodini fenntarthatósági elkötelezettségét. Környezettudatos gyártás és etikus gyakorlatok.",
};

export default function FenntarthatosagPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Fenntarthatóság
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          A Hoodini elkötelezett a környezettudatos gyártás és az etikus gyakorlatok mellett.
          Minden döntésünket a bolygó és a közösség jóléte vezérli.
        </p>

        <h2 className="text-2xl font-bold mb-4">OEKO-TEX szabvány</h2>
        <p className="mb-6">
          Minden termékünk OEKO-TEX szabványú anyagokból készül, amelyek
          szigorú kémiai vizsgálatokon esnek át. Ez garantálja, hogy ruháink
          nem tartalmaznak káros anyagokat és biztonságosak a bőrre.
        </p>

        <h2 className="text-2xl font-bold mb-4">Etikus gyártás</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Minden partnerünkkel fair trade feltételek mellett dolgozunk</li>
          <li>Átlátható ellátási lánc és munkakörülmények</li>
          <li>Minimális vízfogyasztású gyártási folyamatok</li>
          <li>Újrahasznosított csomagolóanyagok használata</li>
          <li>Szén-dioxid kibocsátás csökkentésére törekvés</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Környezettudatos gyakorlatok</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Csomagolás</h3>
            <p className="text-stone-600">
              Újrahasznosított kartondobozokat és papír töltőanyagokat használunk.
              Kerüljük a műanyag csomagolást ahol csak lehet.
            </p>
          </div>
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Szállítás</h3>
            <p className="text-stone-600">
              Optimalizált szállítási útvonalak és környezetbarát járművek használata.
              Törekszünk a szén-dioxid kibocsátás minimalizálására.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Jövőbeli célok</h2>
        <p className="mb-4">
          2026-ra szeretnénk elérni, hogy termékeink 100%-ban újrahasznosított
          vagy bioanyagokból készüljenek. Továbbá tervezzük a karbon-semleges
          gyártás bevezetését és a közösségi projektek támogatását.
        </p>

        <div className="bg-green-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Csatlakozz hozzánk!</h3>
          <p className="mb-4">
            A fenntarthatóság közös ügy. Minden vásárlással támogatod
            a környezettudatos gyakorlatokat és segítesz egy zöldebb jövőben.
          </p>
        </div>
      </div>
    </div>
  );
}