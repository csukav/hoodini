import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Történetünk",
  description: "Ismerd meg a Hoodini történetét. Hogyan indultunk és hová tartunk a prémium streetwear világában.",
};

export default function TortenetunkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Történetünk
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          A Hoodini 2020-ban indult útjára Budapesten, azzal a céllal, hogy
          újradefiniálja a magyar streetwear piacot. Ma már több ezer elégedett
          vásárlóval büszkélkedhetünk.
        </p>

        <h2 className="text-2xl font-bold mb-4">Hogyan indult minden?</h2>
        <p className="mb-6">
          A Hoodini alapítói, egy csapat fiatal designer és vállalkozó, akik
          frusztráltak voltak a hazai ruházati piac korlátozott kínálatától.
          Úgy döntöttek, hogy létrehoznak egy olyan márkát, amely ötvözi a
          prémium minőséget, az egyedi dizájnt és a megfizethető árazást.
        </p>

        <p className="mb-8">
          Az első kollekció 2020 tavaszán jelent meg, és azonnal nagy sikert
          aratott. A vásárlók értékelték a minőségi anyagokat, a gondos kivitelezést
          és az egyedi mintákat. Ez ösztönzött minket arra, hogy tovább bővítsük
          a kínálatunkat és fejlesszük a szolgáltatásainkat.
        </p>

        <h2 className="text-2xl font-bold mb-4">Mit képvisel a Hoodini?</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Minőség</h3>
            <p className="text-stone-600">
              Csak prémium anyagokat használunk, minden termék többszörös
              minőségellenőrzésen esik át.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Egyedi dizájn</h3>
            <p className="text-stone-600">
              Saját tervezőcsapatunk gondoskodik arról, hogy minden darab
              egyedi és stílusos legyen.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Fenntarthatóság</h3>
            <p className="text-stone-600">
              Elkötelezettek vagyunk a környezettudatos gyártás mellett,
              OEKO-TEX szabványú anyagokkal dolgozunk.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Hová tartunk?</h2>
        <p className="mb-4">
          A jövőben tovább szeretnénk bővíteni a kollekciónkat, új együttműködéseket
          kötni hazai művészekkel és dizájnerekkel, és még nagyobb hangsúlyt
          fektetni a fenntarthatóságra. Célunk, hogy a Hoodini ne csak egy
          ruházati márka legyen, hanem egy életstílus, amely ötvözi a minőséget,
          a stílust és a környezettudatosságot.
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Köszönjük a bizalmat!</h3>
          <p className="mb-4">
            Minden vásárlónknak köszönjük, hogy részesei ennek az utazásnak.
            A visszajelzéseitek és támogatástok nélkül nem jutottunk volna idáig.
          </p>
        </div>
      </div>
    </div>
  );
}