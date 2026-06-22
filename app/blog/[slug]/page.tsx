import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blogPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Cikk nem talalhato",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${post.title} | Hoodini Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://hoodini.hu/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Hoodini",
      logo: {
        "@type": "ImageObject",
        url: "https://hoodini.hu/og-image.jpg",
      },
    },
    mainEntityOfPage: `https://hoodini.hu/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const jsonLdStr = JSON.stringify(articleJsonLd)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStr }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <nav className="text-sm text-stone-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Fooldal
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link href="/blog" className="hover:text-stone-900 transition-colors">
            Blog
          </Link>
        </nav>

        <header className="border-b border-stone-200 pb-8 mb-8">
          <p className="label-xs text-stone-500 mb-2">2026 Divat</p>
          <h1 className="heading-display text-3xl md:text-5xl leading-tight text-stone-950">
            {post.title}
          </h1>
          <div className="mt-4 text-sm text-stone-500 flex items-center gap-3">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingMinutes} perc olvasas</span>
          </div>
        </header>

        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="heading-display text-2xl text-stone-900 mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4 text-stone-700 leading-relaxed">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={`${section.heading}-${idx}`}>{paragraph}</p>
                ))}
              </div>

              {section.tips && section.tips.length > 0 && (
                <ul className="mt-5 space-y-2 text-stone-700 list-disc pl-6">
                  {section.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6">
          <Link
            href="/blog"
            className="label-xs text-stone-700 hover:text-stone-950 link-underline"
          >
            Vissza a bloghoz
          </Link>
        </div>
      </article>
    </>
  );
}
