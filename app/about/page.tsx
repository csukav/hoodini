import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólunk – A Hoodini Története",
  description:
    "Ismerd meg a Hoodini missziót: prémium streetwear, fenntartható termelés és közösségi értékek.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Rólunk</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        A Hoodini Története
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Hogyan Kezdődött
          </h2>
          <p>
            A Hoodini 2024-ben indult egy egyszerű ötletből: létrehozni azt a
            streetwear márkát, amelyet mi magunk szeretnénk hordani. Nem csupán
            egy termék, hanem egy közösség, ahol a minőség, a stílus és az
            etikus termelés az első helyen van.
          </p>
          <p className="mt-4">
            Azt tapasztaltuk, hogy sok streetwear márkánál hiányzott valami: az
            autentikusság, a fenntarthatóság és az ügyfélekre való valódi
            odafigyelés. Úgy döntöttünk: megcsinálunk valamit mások ellen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Küldetésünk
          </h2>
          <p>
            A Hoodini küldetése: olyan prémium streetwear terméket kínálni,
            amely:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Fenntartható anyagokból készül</li>
            <li>Etikus körülmények között előállított</li>
            <li>Hosszú élettartamra és stílusra tervezett</li>
            <li>A közösség tagjaival való őszinte dialógusban készül</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Kik Vagyunk?
          </h2>
          <p>
            A Hoodini egy fiatal, szenvedélyes csapatból áll, amely a streetwear
            kultúrára és a fenntartható divatra lelkesedik. Mindannyian legalább
            5 éves tapasztalattal rendelkezünk a divat- és e-commerce iparban.
          </p>
          <p className="mt-4">
            Az ötletgazdáink a kialakítástól a termelésen át a szállításig
            minden lépésben részt vesznek, hogy garantálhassuk a legmagasabb
            minőséget.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Amit Nagyon Vagyunk
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Transzpaens:</strong> Nyíltan beszélünk a termelésről, az
              árazásról és a döntésekről
            </li>
            <li>
              <strong>Ügyfél-centrikus:</strong> Az Ön visszajelzése formálja a
              jövőnket
            </li>
            <li>
              <strong>Fenntartható:</strong> Aktívan csökkentjük a környezeti
              lábnyomunkat
            </li>
            <li>
              <strong>Etikus:</strong> Tisztességes béreket és biztonságos
              körülményeket garantálunk
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            A Jövő
          </h2>
          <p>
            A Hoodini terveinek között szerepel: további fenntartható
            kollekciókat kiadni, helyi közösségeket támogatni, és expandálni
            Európa-szerte. De mindig hű marad az eredeti értékeinkhez: minőség,
            autentikusság és felelelősség.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Csatlakozz Hozzánk
          </h2>
          <p>
            A Hoodini közösség a mi erőforrásunk. Ha tetszik, amit csinálunk,
            kérjük oszd meg velünk a véleményed, csatlakozz az
            Instagram-közösséghez, és szó szerint már a familia részese vagy.
          </p>
          <p className="mt-4">
            <strong>Instagram:</strong> @hoodini
            <br />
            <strong>E-mail:</strong> hello@hoodini.hu
          </p>
        </section>
      </div>
    </div>
  );
}
