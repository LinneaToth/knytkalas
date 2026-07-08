import type { Metadata } from "next";
import { Poppins, Bagel_Fat_One } from "next/font/google";
import "./globals.css";
import NavBar from "@/features/pageFrame/components/NavBar";
import Footer from "@/features/pageFrame/components/Footer";
import { getUser } from "@/data/dal/user/getUser";
import { getSessionUserId } from "@/data/auth/getSessionUserId";

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
  let currentUser = null;

  try {
    const id = await getSessionUserId();
    currentUser = await getUser(id);
  } catch (e) {}

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bagelFatOne.variable} overscroll-x-none scroll-smooth antialiased`}
    >
      <body className="flex h-screen flex-col justify-between overscroll-x-none">
        {" "}
        <NavBar mode={currentUser ? "signedin" : "notSignedIn"} />
        <main className="bg-background flex-1 pt-16"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
