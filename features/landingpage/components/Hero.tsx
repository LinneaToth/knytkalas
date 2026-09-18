"use client";

import Image from "next/image";
import Button from "@/ui/components/Button";
import { PartyPopper } from "lucide-react";

const scrollToAbout = () => {
  const section = document.getElementById("about");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Hero() {
  return (
    <div className="relative isolate">
      <figure className="absolute top-0 left-0 -z-10 h-screen w-full bg-[url('/graphics/bg.svg')] bg-cover xl:h-150 xl:bg-center"></figure>
      <div className="mx-auto max-w-7xl p-5 xl:grid xl:grid-cols-3">
        <section className="text-foreground-light relative z-10 flex min-h-screen flex-col items-start justify-center px-10 pb-20 xl:col-span-2 xl:mx-auto xl:h-150 xl:min-h-0 xl:justify-end xl:px-20">
          {" "}
          <h1 className="text-foreground-light text-6xl font-semibold">
            Plan your{" "}
            <span className="hover:text-secondary *: cursor-default transition-all duration-500 ease-in-out">
              Potluck
            </span>
          </h1>
          <div className="flex w-full max-w-200 flex-col items-start justify-center gap-3 py-5">
            <p className="text-md mb-5 max-w-xl">
              Organize menus, track guest list and RSVP’s and relax with built
              in allergy administration. Seamless and collaborative!
            </p>
          </div>
          <nav className="z-20 flex w-full max-w-240 flex-col justify-start gap-5 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              href="/onboarding"
              hoverMove={true}
            >
              <PartyPopper />
              join the party
            </Button>
            <Button
              hoverMove={true}
              variant="dark"
              size="lg"
              onClick={scrollToAbout}
              className="border-white text-white hover:bg-white/10"
            >
              see how it works
            </Button>
          </nav>
        </section>
        <figure className="hidden xl:col-span-1 xl:flex xl:items-end xl:justify-center">
          <Image
            src="/graphics/phone.png"
            alt="Phone mockup"
            width={900}
            height={1356}
          />
        </figure>
      </div>
    </div>
  );
}
