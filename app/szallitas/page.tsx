import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szállítási információk",
  description: "Ismerd meg a Hoodini szállítási feltételeit. Ingyenes szállítás 15 000 Ft felett, gyors kiszállítás Magyarországon.",
};

export default function SzallitasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Szállítási információk
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          Gyors és megbízható szállítás minden rendeléshez. Magyarország teljes területén
          házhoz szállítással vagy csomagpontokra.
        </p>

        <h2 className="text-2xl font-bold mb-4">Szállítási díjak</h2>
        <div className="bg-stone-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">15 000 Ft felett</span>
            <span className="text-green-600 font-bold">INGYENES</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">15 000 Ft alatt</span>
            <span className="font-bold">1 490 Ft</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Szállítási határidők</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Magyarország területén: 2–4 munkanap</li>
          <li>Expressz szállítás: +1 000 Ft felárért 1–2 munkanap</li>
          <li>Szombati kézbesítés: +500 Ft felárért</li>
          <li>Csomagpontos átvétel: 2–3 munkanap</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Szállítási módok</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Házhoz szállítás</h3>
            <p className="text-stone-600">
              Kényelmes megoldás közvetlenül az ajtódig. MPL futár szolgáltatással.
            </p>
          </div>
          <div className="border border-stone-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Csomagpont</h3>
            <p className="text-stone-600">
              Több mint 2000 csomagpont Magyarországon. Rugalmas nyitvatartás.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Nyomonkövetés</h2>
        <p className="mb-4">
          Minden rendelésről e-mail értesítést küldünk a szállítás megkezdésekor.
          A csomagod állapotát a futár weboldalán követheted nyomon.
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Kérdésed van?</h3>
          <p className="mb-4">
            Ha bármilyen kérdésed van a szállítással kapcsolatban,
            írj nekünk a hello@hoodini.hu címre vagy használd az oldal alján lévő chat-et.
          </p>
        </div>
      </div>
    </div>
  );
}