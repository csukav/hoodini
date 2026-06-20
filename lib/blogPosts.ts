export interface BlogSection {
  heading: string;
  paragraphs: string[];
  tips?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingMinutes: number;
  keywords: string[];
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "divat-trendek-2026-utcai-retegzes",
    title: "2026 divat trendek: urbánus rétegzés és statement felsők",
    excerpt:
      "A 2026-os streetwear egyik legerosebb iránya a tudatos rétegzés: textúra, arány és funkcionalitás egyszerre.",
    coverImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
    publishedAt: "2026-01-15",
    updatedAt: "2026-03-02",
    author: "Hoodini Szerkesztoseg",
    readingMinutes: 6,
    keywords: [
      "2026 divat",
      "streetwear trendek",
      "rétegzés",
      "hoodie outfit",
      "férfi divat 2026",
    ],
    sections: [
      {
        heading: "Mi valtozik 2026-ban?",
        paragraphs: [
          "A 2026-os divatban a szabásvonalak egyszerre lesznek lazák es strukturáltak. A kulcs nem az, hogy mindent oversize-ra cserélj, hanem hogy az arányokat tudatosan építsd fel.",
          "A streetwear ma már nem csak sportos alapdarabokat jelent, hanem szerkesztett, editorialis hatású szetteket is. A hoodie mellé gyakran jelenik meg egy kontrasztos, tiszta szabású külső réteg.",
        ],
      },
      {
        heading: "A retegzes 3 alapszabálya",
        paragraphs: [
          "1) Mindig legyen legalább egy rövidebb és egy hosszabb réteg a szettben, ettől lesz vizuális mélység. 2) Keverj matt és enyhén fényes felületeket. 3) Ne csak a színeket, hanem az anyagvastagságot is variáld.",
        ],
        tips: [
          "Base layer: egyszínű póló vagy hosszúujjú.",
          "Mid layer: kapucnis felső vagy sweatshirt.",
          "Top layer: könnyű dzseki, utility jacket vagy boxy kabát.",
        ],
      },
      {
        heading: "Milyen színekkel mukodik a trend?",
        paragraphs: [
          "A neutrális paletta 2026-ban is eros: kőszürke, grafit, homok, törtfehér. Ezeket egyetlen accent színnel érdemes megtörni, például mély zölddel vagy rozsda árnyalattal.",
        ],
      },
    ],
  },
  {
    slug: "fenntarthato-divat-2026-anyagok-es-minoseg",
    title: "Fenntartható divat 2026: anyagválasztás, ami nem csak marketing",
    excerpt:
      "A tudatos vásárlás 2026-ban már alapelv: az anyagösszetétel, tartósság és javíthatóság fontosabb, mint az egyszeri akció.",
    coverImage:
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=1600&q=80",
    publishedAt: "2026-02-10",
    updatedAt: "2026-04-18",
    author: "Hoodini Szerkesztoseg",
    readingMinutes: 7,
    keywords: [
      "fenntartható divat",
      "2026 trendek",
      "anyagösszetétel",
      "slow fashion",
      "minőségi streetwear",
    ],
    sections: [
      {
        heading: "Miért no a minoseg szerepe?",
        paragraphs: [
          "A vásárlók egyre gyakrabban számolnak teljes életciklus-költséggel: mennyi ideig hordható egy darab, mennyire tartja az alakját, és hogyan öregszik az anyag.",
        ],
      },
      {
        heading: "Mit nezz meg vasarlas elott?",
        paragraphs: [
          "Nézd meg az anyagarányt (például pamut-poliészter keverék), a varrás erősségét, a passzé minőségét és a mosási ajánlást. Ezek sokkal jobb jelzők, mint egy hangzatos trendcímke.",
        ],
        tips: [
          "Masszív nyak- és vállvarrás a pólóknál.",
          "Dupla varrás a gyakran terhelt pontokon.",
          "A cipzár és zsinór minősége a hoodie élettartamát erősen befolyásolja.",
        ],
      },
      {
        heading: "Hogyan lesz SEO-elony a fenntarthatosagbol?",
        paragraphs: [
          "A részletes, valós anyaginformációkat és ápolási tippeket tartalmazó cikkekre gyakran hivatkoznak fórumok és közösségi platformok. Ez növeli az organikus forgalmat és a keresőbeli hitelességet.",
        ],
      },
    ],
  },
  {
    slug: "streetwear-szintrendek-2026",
    title: "Streetwear színtrendek 2026-ra: neutrál + egy karakteres fókusz",
    excerpt:
      "A 2026-os szezonban a letisztult alapokra épülő, mégis emlékezetes színpontok dominálnak az utcai divatban.",
    coverImage:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?w=1600&q=80",
    publishedAt: "2026-03-14",
    updatedAt: "2026-05-01",
    author: "Hoodini Szerkesztoseg",
    readingMinutes: 5,
    keywords: [
      "színtrend 2026",
      "streetwear színek",
      "outfit inspiráció",
      "férfi stílus",
      "monokróm öltözködés",
    ],
    sections: [
      {
        heading: "A neutrális alap marad az egyik legerosebb",
        paragraphs: [
          "A szürke, fekete, törtfehér és homok árnyalatok továbbra is stabil alapot adnak. Ezekre sokkal könnyebb szezonról szezonra építkezni.",
        ],
      },
      {
        heading: "Egy fókuszszín szabaly",
        paragraphs: [
          "A legjobb 2026-os outfit-ek gyakran egyetlen erősebb fókuszszín köré épülnek: olívazöld, téglavörös vagy mély kék. Így a szett karakteres marad, de nem lesz túlzsúfolt.",
        ],
        tips: [
          "Monokróm alap + színes cipő.",
          "Semleges szett + karakteres sapka vagy crossbody.",
          "Két neutrális réteg + egy kontrasztos felső.",
        ],
      },
      {
        heading: "Mit keresnek a felhasznalok?",
        paragraphs: [
          "SEO oldalról a konkrét keresések, mint a 2026 streetwear színek, férfi outfit ötletek 2026 vagy neutrális outfit tippek, jól célozhatók a blog tartalmával.",
        ],
      },
    ],
  },
  {
    slug: "capsule-wardrobe-2026-streetwear",
    title: "Capsule wardrobe 2026: 12 streetwear darab, rengeteg kombináció",
    excerpt:
      "Kevesebb, jobb darab: bemutatjuk, hogyan építs 2026-ban kapszula ruhatárat streetwear alapokon.",
    coverImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    publishedAt: "2026-04-07",
    updatedAt: "2026-05-30",
    author: "Hoodini Szerkesztoseg",
    readingMinutes: 8,
    keywords: [
      "capsule wardrobe",
      "streetwear alapdarabok",
      "2026 divat tippek",
      "minimalista ruhatár",
      "outfit kombináció",
    ],
    sections: [
      {
        heading: "Mi az idealis 12 darab?",
        paragraphs: [
          "A cél nem a mennyiség, hanem a kombinálhatóság. Egy kapszula ruhatárban minden darab legalább 3-4 másik elemmel működik.",
        ],
        tips: [
          "2 hoodie, 3 póló, 2 nadrág, 1 könnyű dzseki, 1 erősebb kabát, 1 sneaker, 1 kiegészítő szett.",
        ],
      },
      {
        heading: "Hogyan merd a kapszula sikert?",
        paragraphs: [
          "Ha kevesebb idő alatt tudsz szettet választani, és kevesebb impulzusvásárlásod van, a kapszula rendszer működik. 2026-ban ez már stílus- es költséghatékonysági döntés egyszerre.",
        ],
      },
      {
        heading: "SEO nyereseg webshopnak",
        paragraphs: [
          "A kapszula ruhatár témájú tartalmak remekül összeköthetők kategóriaoldalakkal és termékoldalakkal. Ez javítja a belső linkhálót és növeli a felhasználó oldalon töltött idejét.",
        ],
      },
    ],
  },
];
