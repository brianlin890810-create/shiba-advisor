"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const WIN_RATE = 0.1;
const SPIN_MS = 1800;
const SPIN_SYMBOLS = ["₿", "🐕", "🐾", "💰", "🎁", "✨"];

function randomUnit() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
}

export default function LuckyDrawModal() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [symbol, setSymbol] = useState("₿");
  const [result, setResult] = useState(null); // null | "win" | "lose"
  const [history, setHistory] = useState({ total: 0, wins: 0 });
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current.forEach(clearInterval);
    timers.current = [];
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => clearTimers, []);

  const close = () => {
    clearTimers();
    setSpinning(false);
    setOpen(false);
  };

  const draw = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % SPIN_SYMBOLS.length;
      setSymbol(SPIN_SYMBOLS[i]);
    }, 90);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      const win = randomUnit() < WIN_RATE;
      setSymbol(win ? "₿" : "🐕");
      setResult(win ? "win" : "lose");
      setHistory((h) => ({ total: h.total + 1, wins: h.wins + (win ? 1 : 0) }));
      setSpinning(false);
    }, SPIN_MS);

    timers.current.push(interval, timeout);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-gold/40 px-8 py-3 text-sm font-semibold tracking-widest text-gold-light transition-colors hover:bg-gold/10"
      >
        🎁 幸運抽獎
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lucky-draw-title"
            className="card-royal relative w-full max-w-md rounded-2xl bg-background p-8 text-center"
            style={{ transform: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-gold/10 hover:text-gold-light"
            >
              ✕
            </button>

            <p className="text-xs tracking-[0.4em] text-gold-light/80">L U C K Y&nbsp; D R A W</p>
            <h2
              id="lucky-draw-title"
              className="font-display mt-3 text-2xl font-bold text-gold-gradient sm:text-3xl"
            >
              柴經幸運抽獎
            </h2>
            <p className="mt-3 text-sm text-foreground/65">
              每次抽獎有 10% 機率抽中 <span className="text-gold-light">1 顆比特幣</span>
            </p>

            <div
              className={`badge-glow mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/[0.06] text-6xl ${
                result === "win" ? "text-gold" : ""
              }`}
              aria-hidden="true"
            >
              {symbol}
            </div>

            <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
              {spinning && <p className="text-sm tracking-widest text-foreground/60">抽獎中…</p>}
              {!spinning && result === "win" && (
                <>
                  <p className="font-display text-xl font-bold text-gold-gradient">🎉 恭喜抽中 1 顆比特幣！</p>
                  <p className="mt-1 text-xs text-foreground/55">請聯繫柴經顧問客服領取獎品</p>
                </>
              )}
              {!spinning && result === "lose" && (
                <>
                  <p className="text-lg text-gold-light">差一點點！</p>
                  <p className="mt-1 text-xs text-foreground/55">再試一次，好運就在下一抽</p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={draw}
              disabled={spinning}
              className="btn-royal mt-4 w-full rounded-full px-8 py-3 text-sm font-semibold tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
            >
              {spinning ? "抽獎中…" : result ? "再抽一次" : "開始抽獎"}
            </button>

            {history.total > 0 && (
              <p className="mt-4 text-xs tracking-widest text-foreground/50">
                已抽 {history.total} 次・中獎 {history.wins} 次
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
