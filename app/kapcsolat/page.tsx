import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Lépj kapcsolatba a Hoodini csapattal. Kérdezz, javasolj vagy csak köszönj be!",
};

export default function KapcsolatPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="prose prose-stone max-w-none">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">
          Kapcsolat
        </h1>

        <p className="text-lg text-stone-600 mb-8">
          Szeretnénk hallani rólad! Legyen szó kérdésről, javaslatról vagy
          együttműködési lehetőségről, várjuk az üzenetedet.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ügyfélszolgálat</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">E-mail</p>
                <p className="text-stone-600">hello@hoodini.hu</p>
              </div>
              <div>
                <p className="font-medium">Telefonos ügyfélszolgálat</p>
                <p className="text-stone-600">+36 1 234 5678</p>
                <p className="text-sm text-stone-500">H-P: 9:00-17:00</p>
              </div>
              <div>
                <p className="font-medium">Chat</p>
                <p className="text-stone-600">Az oldal alján található chat</p>
                <p className="text-sm text-stone-500">24/7 elérhető</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Cégadatok</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Hoodini Kft.</p>
                <p className="text-stone-600">1061 Budapest, Liszt Ferenc tér 1.</p>
              </div>
              <div>
                <p className="font-medium">Adószám</p>
                <p className="text-stone-600">12345678-2-42</p>
              </div>
              <div>
                <p className="font-medium">Cégjegyzékszám</p>
                <p className="text-stone-600">01-09-123456</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Gyakori kérdések</h2>
        <p className="mb-4">
          Mielőtt felveszed velünk a kapcsolatot, nézd meg a{" "}
          <a href="/help" className="text-stone-900 underline hover:text-stone-600">
            GYIK
          </a>{" "}
          oldalt – talán már ott megtalálod a választ!
        </p>

        <div className="bg-stone-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Együttműködések</h3>
          <p className="mb-4">
            Ha dizájner vagy, márka vagy együttműködési lehetőséget keresel,
            írj nekünk a partners@hoodini.hu címre.
          </p>
        </div>
      </div>
    </div>
  );
}