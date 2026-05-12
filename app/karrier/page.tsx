import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karrier",
  description: "Csatlakozz a Hoodini csapatához! Nézd meg az aktuális állásajánlatokat és pályázati lehetőségeket.",
};

export default function KarrierPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Karrier
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          Csatlakozz egy dinamikusan növekvő csapathoz! A Hoodini-nál olyan
          emberekkel dolgozunk együtt, akik szeretik a kihívásokat és
          elkötelezettek a minőség iránt.
        </p>

        <h2 className="text-2xl font-bold mb-4">Miért a Hoodini?</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Dinamikus környezet</h3>
            <p className="text-stone-600">
              Gyorsan növekvő startup környezet, ahol minden nap új kihívások várnak.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Csapatjáték</h3>
            <p className="text-stone-600">
              Egy támogató csapat, ahol mindenki hozzájárul a sikerhez.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Fejlődési lehetőség</h3>
            <p className="text-stone-600">
              Folyamatos tanulás és fejlődés, új projektek és technológiák.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Aktuális állásajánlatok</h2>
        <p className="mb-6">
          Jelenleg nincs nyitott pozíció, de mindig keresünk tehetséges embereket.
          Küldd el az önéletrajzod és motivációs leveled a hr@hoodini.hu címre!
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-2">Mit keresünk?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Elkötelezett, motivált szakembereket</li>
            <li>Csapatjátékosokat, akik nyitottak az új ötletekre</li>
            <li>Kreatív gondolkodókat, akik szeretik a kihívásokat</li>
            <li>Szakmai tapasztalatot vagy friss diplomásokat</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Jelentkezés</h2>
        <p className="mb-4">
          Ha érdekel a lehetőség, küldd el az önéletrajzod és egy rövid
          motivációs levelet a hr@hoodini.hu címre. A tárgysorba írd be:
          "Állásjelentkezés - [Pozíció neve]".
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Gyakran ismételt kérdések</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Milyen munkavégzés lehetséges?</p>
              <p className="text-stone-600">Hibrid munkavégzés, irodában és otthonról.</p>
            </div>
            <div>
              <p className="font-medium">Milyen juttatások vannak?</p>
              <p className="text-stone-600">Kávé, gyümölcs, szakmai fejlődés támogatása.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}