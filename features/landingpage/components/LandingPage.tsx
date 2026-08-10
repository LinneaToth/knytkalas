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
  } catch (e) {}

  return (
    <>
      <NavBar mode={currentUser ? "signedin" : "notSignedIn"} />
      <main className="bg-background flex flex-1 flex-col justify-center py-16">
        {" "}
        <Hero />
        <About />
        <JoinTheParty />
      </main>
      <Footer />
    </>
  );
}
