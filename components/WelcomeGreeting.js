"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const MAX_NAME_LENGTH = 20;

const offerings = [
  {
    icon: "📚",
    title: "財經知識",
    text: "從基礎概念到產業脈絡，用白話帶你打好底子，不再被專有名詞擋在門外。",
  },
  {
    icon: "🧭",
    title: "投資觀念",
    text: "重視紀律與風險控管，陪你建立一套能長期走下去、不隨市場情緒起舞的投資心法。",
  },
  {
    icon: "🗞️",
    title: "市場資訊整理",
    text: "每日重點消息與盤勢濃縮成一目了然的整理，幫你省下大量爬文與過濾雜訊的時間。",
  },
  {
    icon: "🔍",
    title: "易懂的分析內容",
    text: "圖表與邏輯一步步拆解，不只告訴你結論，更讓你看懂背後的「為什麼」。",
  },
];

const STORAGE_KEY = "shiba-visitor-name";
const listeners = new Set();

function readStoredName() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function storeName(name) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // 無痕模式等無法寫入時，仍以本次輸入的稱呼顯示
  }
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export default function WelcomeGreeting() {
  // 伺服器端沒有 localStorage，回傳 null 代表還沒讀到，先不渲染以免畫面閃爍
  const storedName = useSyncExternalStore(subscribe, readStoredName, () => null);
  const [sessionName, setSessionName] = useState("");
  const name = sessionName || storedName || "";
  const [editing, setEditing] = useState(false);
  const asking = storedName !== null && (!name || editing);
  const [draft, setDraft] = useState("");
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const justSubmitted = useRef(false);

  useEffect(() => {
    if (!asking) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [asking]);

  useEffect(() => {
    if (name && justSubmitted.current) {
      justSubmitted.current = false;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [name]);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = draft.trim().slice(0, MAX_NAME_LENGTH);
    if (!trimmed) return;
    justSubmitted.current = true;
    storeName(trimmed);
    setSessionName(trimmed);
    setEditing(false);
  };

  const rename = () => {
    setDraft(name);
    setEditing(true);
  };

  if (storedName === null) return null;

  return (
    <>
      {name && (
        <section
          ref={sectionRef}
          id="welcome"
          className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 pt-16 sm:pt-20"
        >
          <div className="card-royal rounded-3xl px-6 py-10 sm:px-12 sm:py-14" style={{ transform: "none" }}>
            <p className="text-center text-sm tracking-[0.4em] text-gold-light/80">W E L C O M E</p>
            <h2 className="font-display mt-4 text-center text-2xl font-bold leading-snug text-gold-gradient sm:text-3xl lg:text-4xl">
              歡迎你，{name}，來到柴經顧問頻道！
            </h2>

            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-sm leading-8 text-foreground/75 sm:text-base sm:leading-8">
              <p>
                很高興在這裡遇見你。市場每天都有新消息，資訊多到讓人不知道該相信誰——
                而你願意停下腳步、花時間認真學習，這一步，已經走得很對了。
              </p>
              <p>
                在柴經顧問，我們把複雜的財經世界，整理成你看得懂、用得上的內容，
                陪你一步一步建立屬於自己的判斷力。在這裡，你可以持續獲得：
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {offerings.map((o) => (
                <div
                  key={o.title}
                  className="flex gap-4 rounded-2xl border border-gold/20 bg-gold/[0.03] p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-lg">
                    {o.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gold-light">{o.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/65">{o.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-8 text-foreground/75 sm:text-base">
              接下來的每一天，我們都會持續為你準備有價值的內容。
              <br className="hidden sm:block" />
              {name}，很高興你加入柴經大家庭，我們一起穩穩前進 🐾
            </p>

            <p className="mt-6 text-center">
              <button
                type="button"
                onClick={rename}
                className="text-xs tracking-widest text-foreground/45 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
              >
                不是 {name}？修改稱呼
              </button>
            </p>
          </div>
        </section>
      )}

      {asking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
            <form
              role="dialog"
              aria-modal="true"
              aria-labelledby="welcome-name-title"
              onSubmit={submit}
              className="card-royal w-full max-w-md rounded-2xl bg-background p-8 text-center"
              style={{ transform: "none" }}
            >
              <p className="text-3xl" aria-hidden="true">🐕</p>
              <p className="mt-3 text-xs tracking-[0.4em] text-gold-light/80">N I C E&nbsp; T O&nbsp; M E E T&nbsp; Y O U</p>
              <h2
                id="welcome-name-title"
                className="font-display mt-3 text-2xl font-bold text-gold-gradient"
              >
                初次見面，該怎麼稱呼你？
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/65">
                留下你的稱呼，讓柴經顧問好好認識你。
              </p>

              <label htmlFor="welcome-name" className="sr-only">
                你的稱呼
              </label>
              <input
                id="welcome-name"
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={MAX_NAME_LENGTH}
                placeholder="例如：小柴、Brian"
                autoComplete="nickname"
                className="mt-6 w-full rounded-full border border-gold/30 bg-white/[0.03] px-5 py-3 text-center text-foreground placeholder:text-foreground/35 focus:border-gold/70 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!draft.trim()}
                className="btn-royal mt-5 w-full rounded-full px-8 py-3 text-sm font-semibold tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
              >
                進入柴經顧問
              </button>
            </form>
          </div>
        )}
    </>
  );
}
