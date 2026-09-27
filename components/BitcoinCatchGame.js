"use client";

import { useEffect, useRef, useState } from "react";

const GAME_SECONDS = 15;
const W = 480;
const H = 600;
const PLAYER_W = 96;
const PLAYER_H = 18;
const PLAYER_Y = H - 48;
const PLAYER_SPEED = 560;
const COIN_R = 18;
const POP_SECONDS = 0.6;

function drawCoin(ctx, c) {
  // 以水平縮放模擬錢幣旋轉
  const squash = Math.abs(Math.cos(c.spin)) * 0.6 + 0.4;
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.scale(squash, 1);
  const grad = ctx.createRadialGradient(-6, -6, 2, 0, 0, COIN_R);
  grad.addColorStop(0, "#f9ecc0");
  grad.addColorStop(0.5, "#d4af37");
  grad.addColorStop(1, "#9c7a1f");
  ctx.beginPath();
  ctx.arc(0, 0, COIN_R, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f3d98b";
  ctx.stroke();
  ctx.fillStyle = "#1a1405";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("₿", 0, 1);
  ctx.restore();
}

function drawPlayer(ctx, x) {
  const left = x - PLAYER_W / 2;
  const grad = ctx.createLinearGradient(left, 0, left + PLAYER_W, 0);
  grad.addColorStop(0, "#9c7a1f");
  grad.addColorStop(0.5, "#f3d98b");
  grad.addColorStop(1, "#d4af37");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(left, PLAYER_Y, PLAYER_W, PLAYER_H, PLAYER_H / 2);
  ctx.fill();
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("🐕", x, PLAYER_Y + 2);
}

function draw(ctx, g) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0b0e1a");
  bg.addColorStop(1, "#060608");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.8);
  glow.addColorStop(0, "rgba(212, 175, 55, 0.14)");
  glow.addColorStop(1, "rgba(212, 175, 55, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  for (const c of g.coins) drawCoin(ctx, c);
  drawPlayer(ctx, g.playerX);

  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f3d98b";
  for (const p of g.pops) {
    ctx.globalAlpha = 1 - p.t / POP_SECONDS;
    ctx.fillText("+1", p.x, p.y - p.t * 50);
  }
  ctx.globalAlpha = 1;
}

export default function BitcoinCatchGame() {
  const canvasRef = useRef(null);
  const game = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);

  // 依裝置像素比設定畫布解析度，並畫出開始前的畫面
  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, { playerX: W / 2, coins: [], pops: [] });
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = canvasRef.current.getContext("2d");
    const g = game.current;
    let raf;
    let last = performance.now();

    const setKey = (e, down) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") g.keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") g.keys.right = down;
      else return;
      e.preventDefault();
    };
    const onKeyDown = (e) => setKey(e, true);
    const onKeyUp = (e) => setKey(e, false);

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const elapsed = (now - g.start) / 1000;
      const remaining = Math.max(0, GAME_SECONDS - elapsed);
      const progress = Math.min(elapsed / GAME_SECONDS, 1);

      // 移動：鍵盤優先，否則平滑跟隨滑鼠 / 手指位置
      const dir = (g.keys.right ? 1 : 0) - (g.keys.left ? 1 : 0);
      if (dir) {
        g.playerX += dir * PLAYER_SPEED * dt;
        g.targetX = null;
      } else if (g.targetX !== null) {
        const diff = g.targetX - g.playerX;
        const step = PLAYER_SPEED * 1.6 * dt;
        g.playerX += Math.abs(diff) <= step ? diff : Math.sign(diff) * step;
      }
      g.playerX = Math.min(W - PLAYER_W / 2, Math.max(PLAYER_W / 2, g.playerX));

      // 隨時間越掉越快、越掉越多
      g.spawnIn -= dt;
      if (g.spawnIn <= 0) {
        g.coins.push({
          x: COIN_R + Math.random() * (W - COIN_R * 2),
          y: -COIN_R,
          vy: 200 + progress * 180 + Math.random() * 80,
          spin: Math.random() * Math.PI * 2,
        });
        g.spawnIn = 0.55 - progress * 0.25;
      }

      let caught = 0;
      g.coins = g.coins.filter((c) => {
        c.y += c.vy * dt;
        c.spin += dt * 4;
        const hit =
          c.y + COIN_R >= PLAYER_Y &&
          c.y - COIN_R <= PLAYER_Y + PLAYER_H &&
          Math.abs(c.x - g.playerX) <= PLAYER_W / 2 + COIN_R * 0.6;
        if (hit) {
          caught++;
          g.pops.push({ x: c.x, y: PLAYER_Y - 16, t: 0 });
          return false;
        }
        return c.y - COIN_R < H;
      });
      g.pops = g.pops.filter((p) => (p.t += dt) < POP_SECONDS);

      if (caught) {
        g.score += caught;
        setScore(g.score);
      }
      const secs = Math.ceil(remaining);
      if (secs !== g.shownSecs) {
        g.shownSecs = secs;
        setTimeLeft(secs);
      }

      draw(ctx, g);

      if (remaining <= 0) {
        setPhase("over");
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [phase]);

  const start = () => {
    game.current = {
      start: performance.now(),
      playerX: W / 2,
      targetX: null,
      keys: { left: false, right: false },
      coins: [],
      pops: [],
      spawnIn: 0,
      score: 0,
      shownSecs: GAME_SECONDS,
    };
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setPhase("playing");
  };

  const aim = (e) => {
    if (phase !== "playing") return;
    const rect = canvasRef.current.getBoundingClientRect();
    game.current.targetX = ((e.clientX - rect.left) * W) / rect.width;
  };

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div className="mb-4 flex items-center justify-between rounded-full border border-gold/25 bg-gold/[0.04] px-6 py-3 text-sm tracking-widest">
        <span className="text-foreground/65">
          剩餘時間{" "}
          <span
            className={`font-display text-lg font-bold tabular-nums ${
              phase === "playing" && timeLeft <= 5 ? "text-red-400" : "text-gold-light"
            }`}
          >
            {timeLeft}
          </span>{" "}
          秒
        </span>
        <span className="text-foreground/65">
          得分{" "}
          <span className="font-display text-lg font-bold tabular-nums text-gold-light">{score}</span>
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_60px_-30px_rgba(212,175,55,0.5)]">
        <canvas
          ref={canvasRef}
          onPointerMove={aim}
          onPointerDown={aim}
          className={`block aspect-[4/5] w-full ${phase === "playing" ? "cursor-none touch-none" : ""}`}
          aria-label="接比特幣遊戲畫面"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 px-6 text-center backdrop-blur-[2px]">
            {phase === "idle" ? (
              <>
                <p className="text-5xl" aria-hidden="true">₿</p>
                <h2 className="font-display mt-4 text-2xl font-bold text-gold-gradient sm:text-3xl">
                  接住掉落的比特幣！
                </h2>
                <p className="mt-4 max-w-xs text-sm leading-7 text-foreground/70">
                  限時 {GAME_SECONDS} 秒，每接到一顆得 1 分。
                  <br />
                  滑鼠或手指左右移動，也可以用鍵盤 ← → 控制柴柴。
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="btn-royal mt-8 rounded-full px-10 py-3 text-sm font-semibold tracking-widest"
                >
                  開始遊戲
                </button>
              </>
            ) : (
              <>
                <p className="text-xs tracking-[0.4em] text-gold-light/80">T I M E &nbsp;U P</p>
                <h2 className="font-display mt-3 text-2xl font-bold text-gold-light">時間到！</h2>
                <p className="mt-6 text-sm tracking-widest text-foreground/65">你的總得分</p>
                <p className="font-display mt-2 text-6xl font-bold tabular-nums text-gold-gradient" aria-live="polite">
                  {score}
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="btn-royal mt-8 rounded-full px-10 py-3 text-sm font-semibold tracking-widest"
                >
                  重新開始
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
