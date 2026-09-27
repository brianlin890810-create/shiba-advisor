import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { posts } from "@/lib/blog-posts";

export const metadata = {
  title: "柴經觀點｜加密貨幣技術分析",
  description: "柴經顧問的技術分析專欄，帶你從 K 線、指標到趨勢線，一步步建立自己的判讀邏輯。",
};

export default function BlogIndex() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <ScrollReveal className="mb-12 text-center sm:mb-16">
        <p className="text-sm tracking-[0.4em] text-gold-light/80">
          S H I B A&nbsp; I N S I G H T S
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold text-gold-gradient sm:text-4xl lg:text-5xl">
          柴經觀點
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base">
          精選柴經顧問技術分析專欄，從 K 線、指標到趨勢線，帶你一步步建立紀律化的判讀邏輯。
        </p>
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 100}>
            <Link href={`/blog/${post.slug}`} className="block">
              <article className="card-royal rounded-2xl p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs tracking-widest text-gold-light/70">
                  <span className="rounded-full border border-gold/40 px-3 py-1">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span>・</span>
                  <span>閱讀時間 {post.readTime}</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-gold-light sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-foreground/65 sm:text-base">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs tracking-widest text-gold-gradient">
                  閱讀全文 →
                </span>
              </article>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
