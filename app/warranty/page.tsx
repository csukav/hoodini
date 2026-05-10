import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garancia",
  description:
    "Hoodini termékek garanciális feltételei és garancia szavatosság.",
};

export default function WarrantyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Vásárlói tudnivalók</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Garancia & Szavatosság
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Garancia Köre
          </h2>
          <p>
            A Hoodini minden termékre 12 hónapos garancia nyújt a vásárlástól
            számítva. Ez a garancia az alábbi hibákra vonatkozik:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Varrási hiba vagy szétszakadás az első negyedévben</li>
            <li>
              Nyomatánh elválása vagy elszíneződése normál használat mellett
            </li>
            <li>Szövet hibás kötése vagy szövési hiba</li>
            <li>Cipzár vagy gomb működési zavar</li>
            <li>Szín kifakulása normál, ajánlott mosás mellett</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Nem Fedezi a Garancia
          </h2>
          <p>Az alábbi esetekben nem tudjuk garantálni a terméket:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              Normáltól eltérő vagy nem ajánlott használat (szárítógépben
              szárítás, forró vízzel mosás, stb.)
            </li>
            <li>Igénytelen vagy rossz karbantartás miatti sérülés</li>
            <li>
              Külső behatás okozta sérülés (szakadás, égés, kémiai sérülés)
            </li>
            <li>Nem eredeti összeépítés vagy módosítás</li>
            <li>Normál kopás és elhasználódás</li>
            <li>
              A terméket szándékosan vagy nagyobb gondatlansággal sérült meg az
              ügyfél
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Hogyan Igényelj Garanciát?
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Küldj egy e-mailt a <strong>garancia@hoodini.hu</strong> címre a
              megrendelés számával és a hiba leírásával
            </li>
            <li>
              Mellékeld a terméket ábrázoló fotókat, ahol jól látható a hiba
            </li>
            <li>
              Előfordulhat, hogy kérünk a terméket, hogy személyesen
              megvizsgáljuk
            </li>
            <li>
              Ha a garancia érvényes, javítás vagy csere áll rendelkezésedre
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szavatosság
          </h2>
          <p>
            A garancia mellett a magyar fogyasztóvédelmi törvény szerint 2 éves
            szavatosság illeti meg a vásárlót, amely arra vonatkozik, hogy az
            eladott termék az eladás időpontjában rendelkezett-e a termékoldalon
            megjelölt tulajdonságokkal.
          </p>
          <p className="mt-4">
            A szavatosság igényléshez vedd fel velünk a kapcsolatot az eredeti
            vásárlási bizonylat bemutatásával.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Termék Gondozása
          </h2>
          <p>A termék hosszú élettartamának biztosítása érdekében ajánlott:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>30°C-on, kíméletes programon mosni (fordítva)</li>
            <li>Fehérítőt és szárítógépet nem alkalmazni</li>
            <li>Magas hőmérsékletnek kitettségét kerülni</li>
            <li>Közvetlen napfénytől védeni</li>
            <li>Nyírás és hajszálra való haspányolódást elkerülni</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Kérdések?
          </h2>
          <p>
            <strong>E-mail:</strong> hello@hoodini.hu
            <br />
            <strong>Garancia támogatás:</strong> garancia@hoodini.hu
          </p>
        </section>
      </div>
    </div>
  );
}
