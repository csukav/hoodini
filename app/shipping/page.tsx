import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szállítás & Szállítási Díjak",
  description:
    "Hoodini szállítási lehetőségei, díjai és szállítási időpontjai.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Vásárlói tudnivalók</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Szállítás & Szállítási Díjak
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szállítási Lehetőségek
          </h2>
          <p>
            A Hoodini több szállítási lehetőséget kínál a vásárlóinak. Válaszd
            ki az számodra legmegfelelőbb opciót a pénztárnál.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Standardszállítás (2–4 munkanap)
          </h2>
          <p>
            A legtöbb rendelés 2–4 munkanapon belül szállítva. A szállítási
            költség:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>1 490 Ft</strong> – 15 000 Ft alatti rendelésekhez
            </li>
            <li>
              <strong>INGYENES</strong> – 15 000 Ft felett
            </li>
          </ul>
          <p className="mt-4 text-stone-600 italic">
            A szállítási idő munkanapoktól számítva, szombat-vasárnap és
            ünnepnap nem számít.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Expressz Szállítás (1 munkanap)
          </h2>
          <p>
            Ha nagyon sürgős, választhatsz expressz szállítást. A rendelés
            másnapi 10:00–16:00 között érkezik meg Budapest területén.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>3 990 Ft</strong> – Budapest és környéke
            </li>
            <li>
              <strong>4 990 Ft</strong> – Vidéki városok
            </li>
          </ul>
          <p className="mt-4 text-stone-600 italic">
            Csak 16:00 előtt leadott megrendelésekre érvényes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Személyes Átvétel
          </h2>
          <p>
            A Budapest belvárosában van egy kisebb átvételi pontunk.
            Megrendelésed után 1–2 nappal felveheted személyesen – nyitva:
            hétfő–péntek 10:00–18:00.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>INGYENES</strong>
            </li>
            <li>Csak a pénztárnál jelölve érhető el</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Nemzetközi Szállítás
          </h2>
          <p>
            Jelenleg sajnos csak Magyarországon szállítunk. Nemzetközi szállítás
            hamarosan elérhető lesz!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Csomagkövetés
          </h2>
          <p>
            A rendelésed beküldése után e-mailben kapni fogsz egy követési
            kódot. Ezzel nyomon követheted a csomagod útját a szállítótól.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szállítási Kockázat
          </h2>
          <p>
            A Hoodini felel a csomag szállítási kockázatáért. Ha a termék
            megérkezéskor sérülve érkezik, vedd fel velünk a kapcsolatot, és
            pótcsomag küldünk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Kérdések?
          </h2>
          <p>
            <strong>E-mail:</strong> hello@hoodini.hu
            <br />
            <strong>Szállítási támogatás:</strong> szallitas@hoodini.hu
          </p>
        </section>
      </div>
    </div>
  );
}
