"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "送出失敗，請稍後再試");
      setStatus("done");
      setMessage(data.alreadySubscribed ? "你已經在柴經顧問名單裡囉，謝謝你的支持！" : "謝謝你！已成功加入柴經顧問名單 🐾");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "送出失敗，請稍後再試");
    }
  };

  return (
    <div className="mt-14 w-full max-w-xl border-t border-gold/20 pt-12">
      <h3 className="font-display text-lg font-semibold text-gold-light sm:text-xl">
        留下你的 Email，加入我們的柴經顧問名單。
      </h3>
      <p className="mt-3 text-sm leading-7 text-foreground/60">
        我們會透過這個 Email 與你聯繫，並提供柴經相關資訊與最新內容。
      </p>

      <form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="signup-email" className="sr-only">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "sending") setStatus("idle");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-full border border-gold/30 bg-white/[0.03] px-6 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:border-gold/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-royal shrink-0 rounded-full px-8 py-3 text-sm font-semibold tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "送出中…" : "加入名單"}
        </button>
      </form>

      <p
        aria-live="polite"
        className={`mt-4 min-h-[1.5rem] text-sm ${status === "error" ? "text-red-400" : "text-gold-light"}`}
      >
        {(status === "done" || status === "error") && message}
      </p>
    </div>
  );
}
