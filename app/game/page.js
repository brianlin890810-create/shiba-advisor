import BitcoinCatchGame from "@/components/BitcoinCatchGame";

export const metadata = {
  title: "接比特幣小遊戲｜柴經顧問",
  description: "限時 15 秒，看你能接住多少顆掉落的比特幣！純屬娛樂的柴經小遊戲。",
};

export default function GamePage() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm tracking-[0.4em] text-gold-light/80">M I N I&nbsp; G A M E</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-gold-gradient sm:text-4xl lg:text-5xl">
          接比特幣小遊戲
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-foreground/65 sm:text-base">
          學習之餘放鬆一下！15 秒內，看你能幫柴柴接住多少顆比特幣。
        </p>
      </div>

      <BitcoinCatchGame />

      <p className="mx-auto mt-8 max-w-md text-center text-xs leading-6 text-foreground/45">
        本遊戲純屬娛樂用途，不涉及任何真實比特幣、金錢或實際獎勵。
      </p>
    </section>
  );
}
