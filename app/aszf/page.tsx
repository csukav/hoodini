import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  description:
    "A Hoodini webshop általános szerződési feltételei – vásárlás, szállítás, visszaküldés és adatkezelés.",
  robots: { index: false, follow: false },
};

export default function AszfPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <p className="label-xs text-stone-500 mb-2">Jogi dokumentum</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-10">
        Általános Szerződési Feltételek
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-8">
        <p className="text-stone-400 italic">
          Üdvözöljük a(z) Hoodini vásárlói között! Kérjük, rendelése véglegesítése előtt figyelmesen olvassa el az alábbi dokumentumot.

1. Üzemeltetői adatok
Szolgáltató neve: Hoodini Kft.

Székhely: [Cím]

Adószám: [Adószám]

Nyilvántartási szám / Cégjegyzékszám: [Szám]

E-mail cím: [E-mail cím]

Telefonszám: [Telefonszám]

2. A szerződés tárgya
A jelen szerződés keretében a vásárló a Szolgáltató webshopjában található ruházati termékeket (különösen: egyedi logózással ellátott pulóverek) vásárolhatja meg. A termékek lényeges tulajdonságait a termékoldalakon tüntetjük fel.

3. Rendelés menete és a szerződés létrejötte
A vásárló a terméket kosárba helyezi.

A pénztár oldalon megadja a szállítási és számlázási adatokat.

A "Rendelés elküldése" gomb megnyomásával a vásárlónak fizetési kötelezettsége keletkezik.

A szerződés akkor jön létre, amikor a Szolgáltató e-mailben visszaigazolja a rendelést.

4. Árak és fizetési módok
A webshopban feltüntetett árak bruttó árak (tartalmazzák az ÁFÁ-t, vagy alanyi adómentesek).

A szállítási költség a fizetési folyamat végén adódik hozzá a végösszeghez.

Fizetési módok: Bankkártyás fizetés (Stripe), Banki átutalás

5. Szállítási feltételek
A szállítási idő általában 7-10 munkanap, figyelembe véve az egyedi logózási folyamatot.

A szállítást a GLS, Foxpost, Packeta végzi.

A szállítási díj: 1500 Ft.

6. Elállási jog:
A fogyasztót 14 napon belül megilleti az indoklás nélküli elállási jog.

Kivétel: A 45/2014. (II. 26.) Korm. rendelet 29. § (1) bek. c) pontja alapján a fogyasztó nem gyakorolhatja elállási jogát olyan nem előre gyártott termék esetében, amelyet a fogyasztó utasítása alapján vagy kifejezett kérésére állítottak elő, vagy amelyet egyértelműen a fogyasztó személyére szabtak.

Mivel a termékek a vásárló kérésére egyedi logózással készülnek, az elállási jog csak gyártási hiba vagy hibás teljesítés esetén gyakorolható.

7. Kellékszavatosság és Garancia
Hibás teljesítés esetén a vásárló kellékszavatossági igénnyel élhet (javítás, csere vagy vételár-leszállítás). Nem tartozik a szavatosság körébe a nem rendeltetésszerű használatból (pl. nem megfelelő mosás) eredő kár.

8. Adatvédelem
A vásárlók adatait kizárólag a rendelés teljesítése és a számviteli kötelezettségek céljából kezeljük. Részletek az Adatkezelési Tájékoztatóban.

9. Panaszkezelés
A vásárló panaszaival az info@hoodini.hu címen fordulhat hozzánk. Amennyiben vitás kérdés merül fel, a békéltető testületekhez való fordulás joga megilleti a vásárlót.
        </p>
      </div>
    </div>
  );
}
