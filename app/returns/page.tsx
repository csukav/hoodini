import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visszaküldés & Csere",
  description: "Hoodini termékek visszaküldésének és cseréjének feltételei.",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Vásárlói tudnivalók</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Visszaküldés & Csere
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Visszaküldési Feltételek
          </h2>
          <p>
            A Hoodini 30 napos visszaküldési garanciát biztosít minden
            vásárlónak. Ez azt jelenti, hogy a termék vételétől számított 30
            napig lehetőséged van visszaküldeni vagy cserélni a produktumot –
            feltéve, hogy az alábbi feltételek teljesülnek:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              A termék fel nem vett, eredeti, sértetlen csomagolásban legyen
            </li>
            <li>Nem lehet mosva, használva vagy viselve</li>
            <li>
              Az eredeti címkék és varrások közvetlenül ne legyenek szétszakítva
            </li>
            <li>Legyen rajta az eredeti árcédula</li>
            <li>
              A szállítási igazolás és vásárlási dokumentum mellékelve legyen
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Hogyan Kezdjük a Visszaküldést?
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Küldj egy e-mailt a <strong>visszakuldes@hoodini.hu</strong> címre
              a megrendelés számával
            </li>
            <li>
              Fogadjuk meg a kérelmet és e-mailben egy ingyenes visszaküldési
              címkét küldünk vissza
            </li>
            <li>Csomagold be a terméket az eredeti csomagolásban</li>
            <li>
              Ragaszd fel a visszaküldési címkét és vidd a legközelebbi postára
              vagy egyéb futárszolgálathoz
            </li>
            <li>
              A csomag beérkezésétől számított 5 munkanapon belül visszautalunk
              a teljes vételárat
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Csere Lehetőség
          </h2>
          <p>
            Ha nem az megfelelő méret vagy szín, szívesen cserélünk. A cseréhez
            küldd vissza az eredeti terméket a fenti módszerrel, majd az
            e-mailben jelezd, hogy milyen méretet vagy színt szeretnél helyette.
            Az új termék szállítási költsége ingyenes!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Visszaolvasott Visszaküldési Díjak
          </h2>
          <p>
            A Hoodini-nél nem számítunk fel visszaküldési díjat, ha a termék az
            alábbi okok miatt vissza akarod küldeni:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>A termék nem felel meg az oldal leírásának</li>
            <li>Hibás vagy sérült terméket kaptál</li>
            <li>Rossz terméket/mennyiséget kaptál</li>
          </ul>
          <p className="mt-4">
            Bizonyos körülmények között azonban visszaküldési díjat számítunk
            fel, például ha:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>A termék már viselve, mosva vagy sérülve lett</li>
            <li>A csomagolás és címkék el vannak szaggatva</li>
            <li>Az időkorlátot túllépte</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Kérdések?
          </h2>
          <p>
            Ha további kérdéseid vannak a visszaküldésről vagy cseréről, fordulj
            hozzánk bizalommal!
          </p>
          <p className="mt-4">
            <strong>E-mail:</strong> hello@hoodini.hu
            <br />
            <strong>Ügyfélszolgálat e-mail:</strong> visszakuldes@hoodini.hu
          </p>
        </section>
      </div>
    </div>
  );
}
