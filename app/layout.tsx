import type { Metadata } from "next";
import { Poppins, Bagel_Fat_One } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bagelFatOne = Bagel_Fat_One({
  variable: "--font-bagel",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Knytkalas - your effortless potluck planner",
  description: "Easy coordination of guests and dishes",
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
      className={`${poppins.variable} ${bagelFatOne.variable} overscroll-x-none scroll-smooth antialiased`}
    >
      <body className="bg-background flex h-screen w-screen flex-col justify-between overflow-hidden overscroll-x-none">
        {children}
      </body>
    </html>
  );
}
