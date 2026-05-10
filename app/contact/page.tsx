import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description:
    "Vedd fel velünk a kapcsolatot – válaszolunk az összes kérdéseidre!",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Beszélj velünk</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Kapcsolat
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szeretnénk Hallani Tőled
          </h2>
          <p>
            Van egy kérdésed, visszajelzésed, vagy csak szeretnél velünk
            csevegni? Az alábbi csatornákon keresztül tudsz hozzánk fordulni.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            E-mail Cím
          </h2>
          <p>Az általános megérdeklődésekhez és visszajelzésekhez:</p>
          <p className="mt-4">
            <strong>hello@hoodini.hu</strong>
          </p>
          <p className="mt-4">
            Általában 24 órán belül válaszolunk az összes e-mailre.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Speciális Témákhoz
          </h2>
          <ul className="space-y-3">
            <li>
              <strong>📦 Szállítás & Logisztika:</strong> szallitas@hoodini.hu
            </li>
            <li>
              <strong>🔄 Visszaküldés & Csere:</strong> visszakuldes@hoodini.hu
            </li>
            <li>
              <strong>🛠 Garancia & Termék Hiba:</strong> garancia@hoodini.hu
            </li>
            <li>
              <strong>♻️ Fenntarthatóság:</strong> sustainability@hoodini.hu
            </li>
            <li>
              <strong>💼 Üzleti Partnerség:</strong> partners@hoodini.hu
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Közösségi Média
          </h2>
          <p>Kövesd a Hoodini-t és beszélgess velünk valós időben:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Instagram:</strong> @hoodini – Napi tartalom, termékek,
              inspiráció
            </li>
            <li>
              <strong>TikTok:</strong> @hoodini_official – Behind-the-scenes
              videók
            </li>
            <li>
              <strong>Facebook:</strong> Hoodini Streetwear – Közösség és
              visszajelzések
            </li>
            <li>
              <strong>Pinterest:</strong> Hoodini – Stílus inspiráció és ötletek
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Személyes Átvétel
          </h2>
          <p>
            Ha személyesen szeretnél ránk fordulni, van egy kisebb átvételi
            pontunk Budapesten:
          </p>
          <p className="mt-4">
            <strong>Hoodini Hub</strong>
            <br />
            Budapest belváros
            <br />
            Nyitva: Hétfő–péntek 10:00–18:00
            <br />
            <br />A pontos cím és időpontok az e-mail után közölhetőek.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Feddback & Javaslatok
          </h2>
          <p>
            A visszajelzésed végtelenül fontos nekünk. Van egy ötleted? Vagy
            valamit kritizálnál? Kérjük, küldj egy e-mailt a hello@hoodini.hu
            címre. Azt szeretnénk, ha az összes vélemény meghallgatott lenne.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Válaszidő
          </h2>
          <p>
            Igyekszünk gyorsan és személyesen válaszolni minden megkeresésre:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              E-mail: <strong>24 órán belül</strong>
            </li>
            <li>
              Közösségi média: <strong>24–48 órán belül</strong>
            </li>
            <li>
              Sürgős kérdések (szállítás, hiba): <strong>4 órán belül</strong>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            FAQ
          </h2>
          <p>
            Gyors válaszokra a leggyakoribb kérdésekre, kérjük, nézd meg a{" "}
            <a href="/help" className="underline hover:text-stone-950">
              GYIK
            </a>{" "}
            oldalt.
          </p>
        </section>
      </div>
    </div>
  );
}
