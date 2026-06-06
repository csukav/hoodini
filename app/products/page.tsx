import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firestoreProducts";
import { normalizeCategorySlug } from "@/lib/productCategories";

export const metadata: Metadata = {
  title: "Termékek – Teljes kollekció",
  description:
    "Fedezd fel a Hoodini teljes streetwear kollekcióját: hoodiék, pólók, nadrágok és kiegészítők. Ingyenes szállítás 15 000 Ft felett.",
};

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category?.toLowerCase() || null;
  const products = await getProducts();

  // Filter products by category if category param exists
  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => normalizeCategorySlug(p.category) === selectedCategory,
      )
    : products;

  const categories = [
    "Összes",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Get display name for the selected category
  const getCategoryDisplayName = (slug: string | null) => {
    if (!slug) return "Összes termék";
    const categoryMap: Record<string, string> = {
      hoodie: "Hoodie",
      polok: "Pólók",
      nadragok: "Nadrágok",
      sale: "Sale",
    };
    return categoryMap[slug] || slug;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <p className="label-xs text-stone-500 mb-1">Kollekció</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-1">
        {getCategoryDisplayName(selectedCategory)}
      </h1>
      <p className="text-stone-400 text-sm mb-8">
        {filteredProducts.length} termék
      </p>

      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="list"
        aria-label="Kategóriák"
      >
        {categories.map((cat) => (
          <Link
            key={cat}
            role="listitem"
            href={
              cat === "Összes"
                ? "/products"
                : `/products?category=${normalizeCategorySlug(cat)}`
            }
            className={`px-4 py-1.5 text-xs font-medium border transition-all ${
              (cat === "Összes" && !selectedCategory) ||
              (cat !== "Összes" &&
                normalizeCategorySlug(cat) === selectedCategory)
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-950"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-stone-400 text-sm">
          Ebben a kategóriában még nincsenek termékek.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* SEO Content Section */}
      <div className="mt-16 md:mt-20 pt-12 border-t border-stone-200">
        <article className="prose prose-sm max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-950 mb-6">
            Fedezd fel a Hoodini streetwear kollekcióját
          </h2>

          <p className="text-stone-700 leading-relaxed mb-4">
            Üdvözölünk a Hoodini termékek világában! Mi az Magyarország vezető
            streetwear márkája, amely prémium minőségű ruhadarabokat kínál a
            modern, stílustudat fiatalok számára. A Hoodini kollekcióban
            megtalálsz mindent, amit szükségsége van a tökéletes streetwear
            outfithez: divatos hoodiéket, magas minőségű pólókat, kényelmes
            nadrágokat és egyéb kiegészítőket, amelyek biztosan felemelik a te
            stílusod.
          </p>

          <h3 className="text-xl font-bold text-stone-950 mt-6 mb-3">
            Hoodie – Az alapvető streetwear darab
          </h3>
          <p className="text-stone-700 leading-relaxed mb-4">
            A Hoodini hoodie kollekcióval találkozhat az egyik legkeresettebb
            ruhadarabbal a streetwear világában. Minden hoodie egyedi designnal,
            prémium anyagokkal és lenyűgöző kényelemmel készül. Akár casual
            hétköznapiakhoz, akár sportosabb megjelenéshez, a mi hoodiéink
            tökéletes választás. Az elasztikus anyagok és ergonomikus vágás
            biztosítja, hogy hosszú éven át hordhatod kedvenc darabaidat.
          </p>

          <h3 className="text-xl font-bold text-stone-950 mt-6 mb-3">
            Pólók – Sokoldalú és stílusos
          </h3>
          <p className="text-stone-700 leading-relaxed mb-4">
            A Hoodini pólók az egyedi tervezésről és a fenntartható
            anyaghasználatról ismert. Válassz klasszikus fazonok közül vagy
            fedezz fel modern, merész dizájnokat. A pólók számos szín és méreten
            elérhetőek, így biztosan megtalálod a neked való darabot. Legyen szó
            egy egyszerű pólóról vagy egy nyomott grafikás darabról, minden
            terméket a legmagasabb minőségi szabványoknak megfelelően gyártunk.
          </p>

          <h3 className="text-xl font-bold text-stone-950 mt-6 mb-3">
            Nadrágok – Kényelem és stílus egységben
          </h3>
          <p className="text-stone-700 leading-relaxed mb-4">
            A Hoodini nadrágok kollekcióját úgy terveztük, hogy kombinálják az
            utcai stílus és az alapvető kényelmet. A streetwear-inspirált
            fazonok, rugalmas anyagok és gondos feldolgozás garantálják, hogy
            minden nadrág tökéletes illeszkedést nyújt. Legyen szó klasszikus
            jogger nadrágról vagy trendy szoknyavágási modellek közül, a mi
            nadrágok biztos találat a te szekrényed számára.
          </p>

          <h3 className="text-xl font-bold text-stone-950 mt-6 mb-3">
            Miért válassz Hoodini-t?
          </h3>
          <p className="text-stone-700 leading-relaxed mb-4">
            A Hoodini más streetwear brandoktól azért tér el, mert
            elkötelezetten dolgozunk a minőség, az originalitás és az
            ügyfélszolgálat tekintetében. Minden terméket szorgalmasan
            vizsgálunk meg, hogy biztosítsuk az összes Hoodini szabvány
            teljesítését. Az ingyenes szállítás 15 000 Ft feletti rendelésekre,
            gyors kézbesítés és ügyfélközpontú támogatás teheti vásárlási
            élmményedet egyedivé. Csatlakozz azokhoz az ezrekhez, akik már
            megbíznak a Hoodini-ban az ő streetwear szükségleteik tekintetében.
          </p>

          <p className="text-stone-600 text-sm italic mt-6">
            Kezdj vásárlni ma, és fedezd fel a Hoodini kollekcióban a te
            következő kedvenc darabját – legyen szó hoodiéről, pólóról vagy
            nadrágról!
          </p>
        </article>
      </div>
    </div>
  );
}
