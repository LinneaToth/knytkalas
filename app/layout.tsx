import type { Metadata } from "next";
import { Poppins, Bagel_Fat_One, Tienne } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tienne = Tienne({
  variable: "--font-tienne",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bagelFatOne = Bagel_Fat_One({
  variable: "--font-bagel-fat-one",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Knytkalas - your effortless potluck planner",
  description: "Easy coordination of guests and dishes",
  icons: "/graphics/logo.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${bagelFatOne.variable} ${tienne.variable} scroll-smooth antialiased`}
    >
      <body className="flex h-screen w-screen flex-col justify-between bg-[url('/graphics/bg_monocolor.svg')] bg-cover">
        {children}
      </body>
    </html>
  );
}
