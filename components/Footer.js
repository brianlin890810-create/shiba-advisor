import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold/20 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-xs tracking-widest text-foreground/50 sm:flex-row sm:justify-between">
        <span className="flex items-center gap-2 font-display text-sm tracking-[0.2em] text-gold-light/80">
          <span className="relative h-7 w-7 shrink-0">
            <Image src="/image/logo.png" alt="柴經顧問" fill sizes="28px" className="object-contain" />
          </span>
          柴經顧問
        </span>
        <span>© 2026 柴經顧問 Shiba Crypto Academy. All Rights Reserved.</span>
      </div>
      <p className="mx-auto mt-4 max-w-6xl px-6 text-center text-[10px] leading-5 text-foreground/35 sm:text-left">
        加密貨幣具高波動性，投資涉及風險，課程內容僅為知識教學與經驗分享，不構成投資建議，請審慎評估自身財務狀況。
      </p>
    </footer>
  );
}
