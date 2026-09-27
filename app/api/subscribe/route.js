import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 依序處理寫入，避免同時送出時互相覆蓋
let queue = Promise.resolve();

async function readSubscribers() {
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function POST(request) {
  let email;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "資料格式錯誤" }, { status: 400 });
  }

  email = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "請輸入有效的 Email" }, { status: 400 });
  }

  const task = queue.then(async () => {
    const subscribers = await readSubscribers();
    if (subscribers.some((s) => s.email === email)) return false;
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
    return true;
  });
  queue = task.catch(() => {});

  try {
    const added = await task;
    return Response.json({ ok: true, alreadySubscribed: !added });
  } catch {
    return Response.json({ error: "系統忙碌中，請稍後再試" }, { status: 500 });
  }
}
