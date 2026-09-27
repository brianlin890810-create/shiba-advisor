import Image from "next/image";
import ParallaxHero from "@/components/ParallaxHero";
import ScrollReveal from "@/components/ScrollReveal";
import LuckyDrawModal from "@/components/LuckyDrawModal";
import WelcomeGreeting from "@/components/WelcomeGreeting";
import EmailSignup from "@/components/EmailSignup";

const studentCars = [
  {
    image: "/image/car-01.jpg",
    car: "Ferrari 296 GTB",
    student: "柴粉學員 A",
    note: "加密貨幣實戰班・資深成員",
  },
  {
    image: "/image/car-02.jpg",
    car: "Ferrari Roma",
    student: "柴粉學員 B",
    note: "進階技術分析班・第三期",
  },
  {
    image: "/image/car-03.jpg",
    car: "Ferrari 488 GTB",
    student: "柴粉學員 C",
    note: "社群陪伴一年心得分享",
  },
  {
    image: "/image/car-04.jpg",
    car: "Lamborghini Aventador SV",
    student: "柴粉學員 D",
    note: "加密貨幣實戰班・結業成員",
  },
  {
    image: "/image/car-05.jpg",
    car: "Lamborghini Huracán",
    student: "柴粉學員 E",
    note: "區塊鏈基礎班・第五期",
  },
  {
    image: "/image/car-06.jpg",
    car: "Porsche 911（70週年紀念版）",
    student: "柴粉學員 F",
    note: "進階技術分析班・第二期",
  },
  {
    image: "/image/car-07.jpg",
    car: "Porsche 911 Carrera S",
    student: "柴粉學員 G",
    note: "社群陪伴半年心得分享",
  },
  {
    image: "/image/car-08.jpg",
    car: "Maserati MC20",
    student: "柴粉學員 H",
    note: "加密貨幣實戰班・結業成員",
  },
  {
    image: "/image/car-09.jpg",
    car: "Chevrolet Corvette C5",
    student: "柴粉學員 I",
    note: "區塊鏈基礎班・第一期",
  },
  {
    image: "/image/car-10.jpg",
    car: "Vector W8 Twin Turbo",
    student: "柴粉學員 J",
    note: "資深柴粉・社群三年老成員",
  },
];

const pillars = [
  {
    title: "從零開始教學",
    text: "不懂區塊鏈也沒關係，柴經顧問用最白話的方式帶你認識加密貨幣、錢包與交易所操作。",
  },
  {
    title: "實戰陪伴社群",
    text: "課後不是結束，而是開始。柴經社群每日盤勢分享、答疑陪跑，跟柴粉們一起成長。",
  },
  {
    title: "紀律優先教學",
    text: "我們教的不只是進出場技巧，更強調風險控管與資金配置，讓你穩健走長期的路。",
  },
];

const stats = [
  { label: "累積學員人數", value: "3,600+" },
  { label: "課程平均滿意度", value: "97%" },
  { label: "社群活躍成員", value: "8,000+" },
  { label: "深耕加密教育", value: "6 年" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] w-full items-end overflow-hidden sm:h-[600px] lg:h-[640px]">
        <ParallaxHero src="/image/car-01.jpg" alt="柴經顧問學員座駕" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 sm:pb-20">
          <ScrollReveal>
            <div className="badge-glow mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-white p-2.5 shadow-lg sm:h-20 sm:w-20">
              <Image
                src="/image/logo.png"
                alt="柴經顧問 Shiba Advisor"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mb-4 flex items-center gap-2 text-xs tracking-[0.35em] text-gold-light/80 sm:text-sm sm:tracking-[0.4em]">
              <span>🐕</span>
              SHIBA&nbsp; CRYPTO&nbsp; ACADEMY
            </p>
            <h1 className="font-display max-w-2xl text-3xl font-bold leading-tight tracking-wide text-gold-gradient sm:text-5xl lg:text-6xl">
              與柴同行
              <br />
              學加密貨幣，穩穩致富路
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-foreground/70 sm:text-lg sm:leading-8">
              柴經顧問陪你從零開始學加密貨幣，紮實課程搭配長期陪伴社群，
              一起穩健前行，看看柴經學員們的精彩座駕實績。
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
              <button className="btn-royal rounded-full px-8 py-3 text-sm font-semibold tracking-widest">
                瀏覽課程
              </button>
              <button className="rounded-full border border-gold/40 px-8 py-3 text-sm font-semibold tracking-widest text-gold-light transition-colors hover:bg-gold/10">
                免費諮詢
              </button>
              <LuckyDrawModal />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Personalized welcome */}
      <WelcomeGreeting />

      {/* Pillars */}
      <section id="pillars" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:py-20">
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <p className="text-sm tracking-[0.4em] text-gold-light/80">O U R&nbsp; P R O M I S E</p>
          <h2 className="font-display mt-4 text-2xl font-bold text-gold-gradient sm:text-3xl lg:text-4xl">
            柴經顧問，陪你走穩每一步
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <div className="card-royal h-full rounded-2xl p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40">
                  <span className="text-gold-light text-lg">🐾</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-gold-light">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground/65">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-xs px-6">
        <span className="divider-paw block" />
      </div>

      {/* Student Showcase */}
      <section id="showcase" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:py-20">
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <p className="text-sm tracking-[0.4em] text-gold-light/80">
            S T U D E N T&nbsp; S H O W C A S E
          </p>
          <h2 className="font-display mt-4 text-2xl font-bold text-gold-gradient sm:text-3xl lg:text-4xl">
            柴粉學員實績牆
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-foreground/65">
            這些都是柴經顧問社群裡的柴粉學員座駕分享，紀律學習、穩健前行，
            一起成為更好的自己。
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {studentCars.map((item, i) => (
            <ScrollReveal key={item.student} delay={(i % 3) * 100}>
              <div className="card-royal group overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.student} - ${item.car}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-xs tracking-widest text-gold-light backdrop-blur-sm">
                    🐕 {item.student}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-gold-light">
                    {item.car}
                  </h3>
                  <p className="mt-1 text-xs tracking-widest text-foreground/55">
                    {item.note}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-gold/20 bg-gold/[0.03]">
        <ScrollReveal>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4 sm:gap-10 sm:py-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-xl font-bold text-gold-gradient sm:text-2xl lg:text-3xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs tracking-widest text-foreground/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 mx-auto flex max-w-3xl scroll-mt-24 flex-col items-center px-6 py-20 text-center sm:py-24">
        <ScrollReveal className="flex flex-col items-center">
          <h2 className="font-display text-2xl font-bold text-gold-gradient sm:text-3xl lg:text-4xl">
            加入柴經顧問，一起穩健前行
          </h2>
          <p className="mt-6 text-sm leading-7 text-foreground/65 sm:text-base">
            即刻預約免費諮詢，讓柴經顧問陪你踏出學習加密貨幣的第一步。
          </p>
          <button className="btn-royal mt-10 rounded-full px-10 py-3 text-sm font-semibold tracking-widest">
            立即免費諮詢
          </button>
          <EmailSignup />
        </ScrollReveal>
      </section>
    </>
  );
}
