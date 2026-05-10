import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karrier",
  description:
    "Csatlakozz a Hoodini csapatához – nyitott pozíciók és lehetőségek.",
};

export default function CareersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Lehetőségek</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Karrier a Hoodini-ban
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Csatlakozz Hozzánk
          </h2>
          <p>
            A Hoodini egy fiatal, dinamikus csapat, amely a prémium streetwear
            és a fenntartható divat világában dolgozik. Keresünk tehetséges,
            szenvedélyes embereket, akik velünk szeretnének építeni ezt az igazi
            közösséget.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Mit Keresünk?
          </h2>
          <p>Az ideális Hoodini-s csapattag:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Szenvedélyes a divat, a streetwear vagy az e-commerce iránt</li>
            <li>Értékeli a fenntarthatóságot és az etikus üzletkötést</li>
            <li>Kreatív, önálló és proaktív problémamegoldó</li>
            <li>Jól dolgozik csapatban és szereti a nyitott kommunikációt</li>
            <li>Rugalmas és hajlandó tanulni és fejlődni</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Jelenleg Nyitott Pozíciók
          </h2>
          <p>
            Jelenleg nem rendelkezünk nyitott állásokkal, de mindig figyelünk a
            tehetséges jelöltekre.
          </p>
          <p className="mt-4">
            <strong>Ha érdekel a Hoodini, küldj egy email-t!</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Miért a Hoodini?
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Valódi szándék:</strong> Nem csak üzlet, hanem társadalmi
              hatás
            </li>
            <li>
              <strong>Tanulási lehetőség:</strong> Gyors növekedésű startup,
              ahol sokat tanulhatsz
            </li>
            <li>
              <strong>Kreatív szabadság:</strong> Döntéseid hallgatottak, az
              ötleted számít
            </li>
            <li>
              <strong>Közösség:</strong> Olyan csapatban dolgozol, amely törődik
              egymással
            </li>
            <li>
              <strong>Fenntarthatóság:</strong> Olyan cég, amely valóban
              értékeli a közösséget és a bolygót
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Szakmai Fejlődés
          </h2>
          <p>Támogatjuk az alkalmazottak fejlődését és tanulását:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Mentoráció és támogatás senior csapattársaktól</li>
            <li>Konferenciák és online kurzusok támogatása</li>
            <li>
              Szellemi szabadság kísérletezésre és újítások kipróbálásához
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Bérlakás & Juttatások
          </h2>
          <p>Amit nyújtunk:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Kompetitív fizetés</li>
            <li>Rugalmas munkaidő és home office lehetőség</li>
            <li>Ingyenes Hoodini termékek</li>
            <li>
              Közösségi eseményekre és csapatépítésre fordított költségvetés
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Benyújtás
          </h2>
          <p>
            Ha érdekelnek az álláslehetőségek vagy szeretnél velünk kapcsolatba
            lépni:
          </p>
          <p className="mt-4">
            <strong>E-mail:</strong> careers@hoodini.hu
            <br />
            <strong>Írj nekünk egy rövid levelet:</strong>
            <br />
            - Ki vagy és miért érdekel a Hoodini
            <br />
            - Milyen tapasztalatod van
            <br />- Mire gondolsz, hogy az ideális legyen a Hoodini pozíció
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Sok Szeretettel
          </h2>
          <p>
            A Hoodini egy olyan hely, ahol az emberek számít. Ha azonban nem is
            vagy a "perfekt" jelölt, de szereted a streetwear-t és a
            fenntarthatóságot, írj nekem! Lehet, hogy pontosan rád vagyunk
            szüksége.
          </p>
        </section>
      </div>
    </div>
  );
}
