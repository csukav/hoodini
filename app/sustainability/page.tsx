import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fenntarthatóság",
  description:
    "Hoodini fenntarthatósági intézkedések, környezetvédelem és etikus termelés.",
};

export default function SustainabilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Felelősségünk</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Fenntarthatóság & Etikus Termelés
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Miért Fontos a Fenntarthatóság?
          </h2>
          <p>
            A divatipar az egyik legnagyobb szennyező iparág a világon. A
            Hoodini-nél úgy gondoljuk, hogy az igazi prémium termék nem csak
            szép és minőségi – hanem felelősen készül. A fenntarthatóság a
            DNA-nk része.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Az Anyagok
          </h2>
          <p>Termékeinket olyan anyagokból válogatjuk, amelyek:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Biologiailag lebomló vagy újrahasznosított:</strong>{" "}
              Szerezzük az organikus pamut és újrahasznosított polieszter szálat
            </li>
            <li>
              <strong>Rövid szállítási út:</strong> A termelés főként az EU-ban
              történik, csökkentve a szénlábnyomot
            </li>
            <li>
              <strong>Hosszú élettartam:</strong> Az igazi fenntarthatóság az,
              ha egy termék 5+ évig bírja, nem 5 mosás után.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Etikus Termelés
          </h2>
          <p>Minden termelőnk partnere teljesíti az alábbi szabványokat:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Fair Trade Certified:</strong> Tisztességes bérezés és
              munkakörülmények
            </li>
            <li>
              <strong>GOTS (Global Organic Textile Standard):</strong>{" "}
              Garantáltan nem tartalmaz káros vegyi anyagokat
            </li>
            <li>
              <strong>Nulla gyermekmunka:</strong> Strikt ellenőrzésünk alatt
            </li>
            <li>
              <strong>Munkavédelmi szabványok:</strong> Biztonságos és humánus
              munkakörnyezet
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Csomagolás
          </h2>
          <p>
            A csomagolás 100%-osan újrahasznosítható vagy komposztálható. Az
            alábbiak közül válogatunk:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Papír-alapú szalagok (biodegradálható)</li>
            <li>Újrahasznosított karton</li>
            <li>
              Minimális műanyag használat (csak ahol elkerülhetetlenül
              szükséges)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szállítás & Logisztika
          </h2>
          <p>
            Szállítási partnereink CO₂-semleges vagy alacsony kibocsátású
            szállítást kínálnak. Ahol lehetséges, csoportos szállítást
            használunk az egyes csomagok helyett.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Termékciklus
          </h2>
          <p>A termékeink végét sem feledtük el. Azt szeretnénk, ha:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Ha már nem jó az állapota, leadható lenne újrahasznosításra</li>
            <li>
              Szövethulladékainkat egy jótékonysági szervezetnek adományozhatod
            </li>
            <li>Hosszú élettartamunk miatt általában nem szükséges kidobni</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Közösségi Projektjeink
          </h2>
          <p>Az eladások egy része:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Helyi közösségi projektekre megy</li>
            <li>Környezetvédelmi kezdeményezéseket támogat</li>
            <li>Fiatal dizájnerek oktatására fordítódik</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Mit Tudsz Te Tenni?
          </h2>
          <p>A fenntarthatóság közös munka. Ha Hoodini-termékkel vagy:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              Gondozz rá az ajánlott módon (kíméletes mosás, gyakoribb viselés)
            </li>
            <li>Javíttatsd meg, ha szükséges (nem pedig dobod el)</li>
            <li>Adományozd vagy cseréld el, ha már nem viseled</li>
            <li>Oszd meg másokkal a fenntartható divatot</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Kérdések?
          </h2>
          <p>
            Szeretnél többet tudni a fenntarthatóságról? Vagy van javaslatod
            számunkra?
          </p>
          <p className="mt-4">
            <strong>E-mail:</strong> sustainability@hoodini.hu
          </p>
        </section>
      </div>
    </div>
  );
}
