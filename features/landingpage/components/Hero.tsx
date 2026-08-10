"use client";

import Image from "next/image";
import Button from "@/ui/components/Button";
import FeatureHeadline from "@/ui/components/FeatureHeadline";

const scrollToAbout = () => {
  const section = document.getElementById("about");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Hero() {
  return (
    <div className="relative isolate">
      <figure className="absolute top-0 left-0 -z-10 h-screen w-screen bg-[url('/graphics/bg.svg')] bg-cover bg-center xl:h-200"></figure>
      <div className="mx-auto max-w-7xl xl:grid xl:grid-cols-3">
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center md:px-20 xl:col-span-2 xl:mx-auto xl:h-200 xl:min-h-0">
          {" "}
          <FeatureHeadline size="large" extraStyling="">
            Plan your Potluck
          </FeatureHeadline>
          <div className="bg-primary-darkest/70 -mt-2 flex w-full max-w-200 flex-col items-center justify-center gap-3 border border-white/20 p-5 pt-8 pb-12 text-center shadow-lg backdrop-blur-md md:gap-10">
            <h2 className="text-foreground-light mt-3 text-3xl">
              Effortless coordination of your event
            </h2>
            <p className="text-foreground-light text-md mb-5 max-w-xl text-center">
              Organize menus, track guest list and RSVP’s and relax with built
              in allergy administration. Seamless and collaborative!
            </p>
          </div>
          <nav className="z-20 -mt-15 flex w-full max-w-240 justify-center gap-5 p-8">
            <Button variant="cta" size="l" href="/onboarding">
              join the party
            </Button>
            <Button variant="solid" size="l" onClick={scrollToAbout}>
              see how it works
            </Button>
          </nav>
        </section>
        <figure className="hidden xl:col-span-1 xl:flex xl:items-center xl:justify-center">
          <Image
            src="/graphics/phone.png"
            alt="Phone mockup"
            width={428}
            height={675}
          />
        </figure>
      </div>
    </div>
  );
}
