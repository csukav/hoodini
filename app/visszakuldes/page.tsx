import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visszaküldési szabályzat",
  description: "Ismerd meg a Hoodini visszaküldési szabályzatát. 30 napos visszaküldési garancia minden termékre.",
};

export default function VisszakuldesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Visszaküldési szabályzat
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          A Hoodini-nál elkötelezettek vagyunk az ügyfelek elégedettsége mellett.
          Ezért kínálunk 30 napos visszaküldési garanciát minden termékre.
        </p>

        <h2 className="text-2xl font-bold mb-4">Visszaküldési feltételek</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>A visszaküldés csak eredeti, fel nem használt termékekre vonatkozik</li>
          <li>A termékeket eredeti csomagolásban kell visszaküldeni</li>
          <li>A visszaküldési címkét mi biztosítjuk</li>
          <li>A visszaküldés ingyenes Magyarországon belül</li>
          <li>A visszaküldési határidő a rendelés kézhezvételétől számított 30 nap</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Hogyan kezdeményezd a visszaküldést?</h2>
        <ol className="list-decimal pl-6 mb-8 space-y-2">
          <li>Küldj e-mailt a visszakuldes@hoodini.hu címre</li>
          <li>Add meg a rendelési számot és a visszaküldeni kívánt termékeket</li>
          <li>Kapcsolódunk veled 24 órán belül</li>
          <li>Küldjük a prepaid visszaküldési címkét</li>
          <li>Csomagold be a terméket és add fel postán</li>
        </ol>

        <h2 className="text-2xl font-bold mb-4">Pénzvisszafizetés</h2>
        <p className="mb-4">
          A visszaküldött csomag beérkezésétől számított 5 munkanapon belül
          visszautaljuk a vételárat az eredeti fizetési módra.
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Kérdésed van?</h3>
          <p className="mb-4">
            Ha bármilyen kérdésed van a visszaküldéssel kapcsolatban,
            írj nekünk a hello@hoodini.hu címre vagy használd az oldal alján lévő chat-et.
          </p>
        </div>
      </div>
    </div>
  );
}