import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelem",
  description:
    "Hoodini adatkezelési és adatvédelmi irányelvei, GDPR megfelelőség.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Jogi dokumentum</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Adatvédelmi Irányelvek
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            Bevezetés
          </h2>
          <p>
            A Hoodini Kft. (a továbbiakban: „Hoodini", „mi", vagy „szolgáltató")
            a személyes adatok védelméhez kötelezettséget vállal. Jelen
            adatvédelmi irányelvek ismertetik, hogy hogyan gyűjtjük,
            felhasználjuk, és védelmezzük adataidat.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            1. Milyen Adatokat Gyűjtünk?
          </h2>
          <p>A Hoodini az alábbi személyes adatokat gyűjtheti:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Kontakt információ:</strong> Név, e-mail cím, telefonszám
            </li>
            <li>
              <strong>Szállítási cím:</strong> Város, cím, irányítószám
            </li>
            <li>
              <strong>Fizetési információ:</strong> Fizetési mód (pl. Stripe,
              bankkártya)
            </li>
            <li>
              <strong>Megrendelés adatok:</strong> Termékek, mennyiségek, árak
            </li>
            <li>
              <strong>Felhasználói aktivitás:</strong> Böngészési történet,
              cookie-k, IP cím
            </li>
            <li>
              <strong>Kommunikáció:</strong> E-mail levelezés, chat történet
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            2. Hogyan Használjuk az Adatokat?
          </h2>
          <p>Az adatokat az alábbi célokra használjuk:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Megrendelések feldolgozása és szállítása</li>
            <li>Ügyfélszolgálat nyújtása és támogatás</li>
            <li>Marketing kommunikáció (e-mail, hírlevél)</li>
            <li>Weboldal fejlesztése és optimalizálása</li>
            <li>Csalás és biztonsági fenyegetések megelőzése</li>
            <li>Jogszabályi kötelezettségek teljesítése</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            3. Hogyan Védjük az Adataidat?
          </h2>
          <p>Az alábbi biztonsági intézkedéseket alkalmazzuk:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>SSL titkosítás az összes adatátvitelhez</li>
            <li>Biztonságos szerver infrastruktúra</li>
            <li>Jelszavas hozzáférés-vezérlés</li>
            <li>Rendszeres biztonsági auditok</li>
            <li>GDPR-kompatibilis adatkezelés</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            4. Harmadik Felek
          </h2>
          <p>
            Az adataidat nem értékesítjük harmadik félnek. Azonban az alábbi
            szolgáltatók hozzáférhetnek az adataidhoz:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Szállítási partnerek:</strong> A csomag szállításához
              szükséges információ
            </li>
            <li>
              <strong>Fizetési feldolgozók:</strong> Stripe, PayPal (a
              tranzakciók feldolgozásához)
            </li>
            <li>
              <strong>Marketing partnerek:</strong> Google Analytics, Facebook
              Pixel (anonim adatokkal)
            </li>
            <li>
              <strong>Törvényi hatóságok:</strong> Ha törvényi kötelezettség van
            </li>
          </ul>
          <p className="mt-4">
            Minden harmadik fél aláírta az adatkezelési szerződést (DPA), amely
            garantálja az adatok védelmét.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            5. Sütik
          </h2>
          <p>
            A webhelyünk sütiket (cookie-kat) használ a felhasználói tapasztalat
            javítására. A sütik:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Szükséges sütik:</strong> Bejelentkezés, kosár funkció
            </li>
            <li>
              <strong>Analitikai sütik:</strong> Weboldal használat nyomon
              követése (Google Analytics)
            </li>
            <li>
              <strong>Marketing sütik:</strong> Personalizált hirdetések
              (Facebook Pixel)
            </li>
          </ul>
          <p className="mt-4">
            Az első látogatáskor rákérdezünk a sütik engedélyezésére. Bármikor
            módosíthatod a beállításokat.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            6. Az Adataidhoz Való Hozzáférési Jogok (GDPR)
          </h2>
          <p>
            Az EU általános adatvédelmi rendelete (GDPR) keretében az alábbi
            jogok illetik meg:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Hozzáférés joga:</strong> Kérheted, hogy milyen személyes
              adatokat tárolunk rólad
            </li>
            <li>
              <strong>Törlési joga:</strong> Kérheted az adataid törlését
              bizonyos körülmények között
            </li>
            <li>
              <strong>Módosítási joga:</strong> Kérheted az adataid javítását
              vagy módosítását
            </li>
            <li>
              <strong>Adathordozhatósági joga:</strong> Kérheted az adataid
              másolatát
            </li>
            <li>
              <strong>Tiltakozási joga:</strong> Tiltakozhat a marketing
              kommunikáció ellen
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            7. Adattárolás
          </h2>
          <p>
            Az adataidat csak addig tárolunk, amíg az szükséges vagy a
            jogszabály megköveteli:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Megrendelés adatok:</strong> 7 év (számviteli törvény)
            </li>
            <li>
              <strong>E-mail lista:</strong> Amíg nem iratkozol le
            </li>
            <li>
              <strong>Cookie-k:</strong> Beállítástól függően 6 hónap – 2 év
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            8. Letöltésről Leiratkozás
          </h2>
          <p>
            Ha nem szeretnél marketing e-maileket vagy hírlevelet kapni,
            egyszerűen kattints a „Leiratkozás" linkre bármelyik e-mail végén.
            Azonnal eltávolítunk a listáról.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            9. Adatkezelési Igény
          </h2>
          <p>
            Ha hozzáférni szeretnél az adataidhoz, törlésre vagy módosításra
            szeretnél kérelmet benyújtani:
          </p>
          <p className="mt-4">
            <strong>E-mail:</strong> privacy@hoodini.hu
            <br />
            <strong>Fax:</strong> [fax szám]
            <br />
            <strong>Cím:</strong> [iroda cím]
          </p>
          <p className="mt-4">A kérelmet 30 napban belül feldolgozzuk.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            10. Irányelvek Frissítése
          </h2>
          <p>
            Fenntartjuk a jogot, hogy az adatvédelmi irányelveket bármikor
            megváltoztassuk. A jelentős változtatásokat e-mailben kommunikáljuk.
            A weboldal felső részén a legutolsó frissítés dátuma látható.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-stone-950 mt-8 mb-4">
            11. Kapcsolat
          </h2>
          <p>
            Ha bármilyen kérdésed van az adatvédelem vagy ezeknek az
            irányelveknek a értelmezésével kapcsolatban:
          </p>
          <p className="mt-4">
            <strong>E-mail:</strong> hello@hoodini.hu
            <br />
            <strong>Adatvédelmi felelős:</strong> privacy@hoodini.hu
          </p>
        </section>

        <p className="text-stone-500 italic mt-8">
          Utolsó frissítés: 2024. január
        </p>
      </div>
    </div>
  );
}
