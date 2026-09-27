import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { posts, getPostBySlug } from "@/lib/blog-posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜柴經觀點`,
    description: post.excerpt,
  };
}

function Block({ block }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-display mt-10 mb-4 text-xl font-semibold text-gold-light sm:text-2xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="my-4 flex flex-col gap-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-foreground/70 sm:text-base"
          >
            <span className="mt-1 text-gold-light">🐾</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="my-4 text-sm leading-7 text-foreground/70 sm:text-base">
      {block.text}
    </p>
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <ScrollReveal>
        <Link
          href="/blog"
          className="text-xs tracking-widest text-gold-light/70 transition-colors hover:text-gold-light"
        >
          ← 返回柴經觀點
        </Link>

        <div className="mt-6 mb-3 flex flex-wrap items-center gap-3 text-xs tracking-widest text-gold-light/70">
          <span className="rounded-full border border-gold/40 px-3 py-1">
            {post.tag}
          </span>
          <span>{post.date}</span>
          <span>・</span>
          <span>閱讀時間 {post.readTime}</span>
        </div>

        <h1 className="font-display text-2xl font-bold leading-snug text-gold-gradient sm:text-3xl lg:text-4xl">
          {post.title}
        </h1>

        <div className="divider-gold my-8 w-full" />

        <div>
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="card-royal mt-12 rounded-2xl p-6 text-center sm:p-8">
          <p className="text-sm leading-7 text-foreground/70">
            想更系統化地學習加密貨幣技術分析？歡迎預約柴經顧問免費諮詢。
          </p>
          <Link
            href="/#contact"
            className="btn-royal mt-4 inline-block rounded-full px-8 py-3 text-sm font-semibold tracking-widest"
          >
            立即免費諮詢
          </Link>
        </div>
      </ScrollReveal>
    </article>
  );
}
