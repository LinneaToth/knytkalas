import Image from "next/image";
import Button from "@/components/ui/Button";
import FeatureHeadline from "@/components/ui/FeatureHeadline";

export default function Hero() {
  return (
    <div className="relative isolate">
      <figure className="absolute top-0 left-0 -z-10 h-screen w-screen bg-[url('/graphics/bg.svg')] bg-cover bg-center"></figure>
      <div className="lg:grid lg:grid-cols-3 lg:grid-rows-2">
        <section className="relative z-10 mt-8 flex h-screen flex-col items-center justify-center md:px-20 lg:col-span-2">
          <div className="flex w-full max-w-200 items-center justify-center bg-[url('/graphics/skewed_bg.svg')] bg-contain bg-center bg-no-repeat px-5 py-5 pb-4">
            <article className="flex flex-col items-center justify-center gap-5 py-3 text-center md:gap-10">
              <FeatureHeadline size="large" extraStyling="md:mt-[-2rem]">
                Plan your Potluck
              </FeatureHeadline>
              <h2 className="text-foreground-light text-2xl">
                Effortless coordination of guests and dishes
              </h2>
              <p className="text-foreground-light mb-5 max-w-xl text-center text-lg md:text-xl">
                Organize menus, track guest list and RSVP’s and relax with built
                in allergy administration. Seamless and collaborative!
              </p>
            </article>
          </div>

          <nav className="flex w-full max-w-240 items-center justify-end gap-3 p-7 md:pr-25">
            <Button variant="solid" size="l">
              create event
            </Button>
            <a href="#about">
              <Button variant="outline" size="l">
                read more
              </Button>
            </a>
          </nav>
        </section>
        <figure className="lg:col-span-1 lg:flex lg:items-center lg:justify-center">
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
