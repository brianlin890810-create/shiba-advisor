"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "課程介紹", href: "/#pillars" },
  { label: "學員實績", href: "/#showcase" },
  { label: "柴經觀點", href: "/blog" },
  { label: "接幣遊戲", href: "/game" },
  { label: "聯絡我們", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-gold/20 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 rounded-full border border-gold/30 bg-white p-1.5 shadow-md transition-transform duration-300 hover:scale-105">
            <Image
              src="/image/logo.png"
              alt="柴經顧問 Shiba Advisor"
              fill
              sizes="44px"
              className="object-contain p-1"
            />
          </span>
          <span className="font-display text-lg tracking-[0.2em] text-gold-gradient sm:text-xl">
            柴經顧問
          </span>
        </Link>

        <ul className="hidden gap-7 text-sm lg:gap-10 tracking-widest text-foreground/70 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition-colors hover:text-gold-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="btn-royal hidden rounded-full px-5 py-2 text-sm font-semibold tracking-wide md:inline-flex">
          免費諮詢
        </button>

        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-gold-light transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-gold-light transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-gold-light transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t bg-background/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96 border-gold/20" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 text-sm tracking-widest text-foreground/70">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block transition-colors hover:text-gold-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="btn-royal mt-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide"
          >
            免費諮詢
          </button>
        </ul>
      </div>
    </header>
  );
}
