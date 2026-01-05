import type { Metadata } from "next";
import { Varela_Round, PT_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin", "hebrew"],
  variable: "--font-varela-round",
});

const ptSans = PT_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
});

const workSans = Work_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Rugs & Co - עיצוב שטיחים בהתאמה אישית",
  description: "עצבו את השטיח המושלם שלכם בעזרת בינה מלאכותית",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${varelaRound.variable} ${ptSans.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
