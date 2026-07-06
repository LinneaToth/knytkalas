import Hero from "./Hero";
import About from "./About";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
    </div>
  );
}
