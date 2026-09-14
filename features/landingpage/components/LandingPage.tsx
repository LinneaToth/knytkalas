import Image from "next/image";

import Hero from "./Hero";
import About from "./About";
import Footer from "@/features/pageFrame/components/Footer";
import NavBar from "@/features/pageFrame/components/NavBar";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";
import { getUser } from "@/data/dal/user/getUser";
import JoinTheParty from "./JoinTheParty";

export default async function LandingPage() {
  let currentUser = null;

  try {
    const id = await getSessionUserId();
    currentUser = await getUser(id);
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <NavBar mode={currentUser ? "signedin" : "notSignedIn"} />
      <main className="bg-background flex flex-1 flex-col justify-center gap-10 py-16">
        {" "}
        <Hero />
        <About />{" "}
        <figure className="flex w-full justify-center">
          <Image
            width="800"
            height="702"
            src="/graphics/party-people.png"
            alt="Join the party"
            className="w-full max-w-md"
          />{" "}
        </figure>
        <JoinTheParty />
      </main>
      <Footer />
    </>
  );
}
