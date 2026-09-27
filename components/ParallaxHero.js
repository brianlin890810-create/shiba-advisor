"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxHero({ src, alt }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.2, 90);
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.2)`;
        raf = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 will-change-transform">
      <Image src={src} alt={alt} fill priority className="object-cover" />
    </div>
  );
}
