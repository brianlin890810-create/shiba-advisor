import { Playfair_Display, Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "柴經顧問｜加密貨幣教學與社群",
  description: "柴經顧問帶你從零開始學加密貨幣，紮實課程 + 陪伴社群，看看柴經學員們的精彩座駕實績。",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="zh-Hant"
      className={`${playfair.variable} ${notoSerifTC.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative flex min-h-full flex-1 flex-col bg-background text-foreground">
          <div className="royal-glow" />
          <Header />
          <main className="relative z-10 flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
