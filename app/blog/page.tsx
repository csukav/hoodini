import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog - 2026 divat trendek es streetwear tippek",
  description:
    "SEO-fokuszu blog a 2026-os divatrol: streetwear trendek, szintippek, kapszula ruhatar es fenntarthato oltozkodes.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Hoodini Blog - 2026 divat trendek",
    description:
      "Friss cikkek a 2026-os divatrol, streetwear inspiraciokkal es gyakorlati tippekkel.",
    url: "https://hoodini.hu/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <header className="mb-10 md:mb-14 border-b border-stone-200 pb-8">
        <p className="label-xs text-stone-500 mb-2">Hoodini Blog</p>
        <h1 className="heading-display text-4xl md:text-5xl text-stone-950 leading-tight">
          2026-os divat cikkek
        </h1>
        <p className="mt-4 text-stone-600 max-w-2xl">
          Aktualis streetwear trendek, styling tippek es reszletes iranymutatok
          SEO-fokuszban, hogy organikusan is erosodjon a webshop.
        </p>
      </header>

      <section
        aria-label="Blog cikkek"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group border border-stone-200 bg-white overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingMinutes} perc olvasas</span>
                </div>

                <h2 className="heading-display text-2xl text-stone-950 leading-snug group-hover:text-stone-700 transition-colors">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <p className="mt-5 label-xs text-stone-700">Tovabb a cikkre</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
