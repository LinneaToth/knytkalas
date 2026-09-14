import Image from "next/image";
import AboutCard from "./AboutCard";
import Button from "@/ui/components/Button";

export default function About() {
  return (
    <section
      className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-10 pt-20 text-center"
      id="about"
    >
      {" "}
      <h2 className="text-primary-darker uppercase">How it works</h2>{" "}
      <h3 className="text-primary-darkest text-5xl">
        From invite to the last bite
      </h3>
      <div className="my-10 mt-10 mt-20 flex flex-col gap-15 md:flex-row md:items-stretch xl:gap-5">
        <AboutCard>
          <figure className="bg-card-background -mt-20 rounded-full p-5 shadow transition-transform duration-300 hover:rotate-6">
            <Image
              src={"/graphics/icon_shrimp.svg"}
              alt="Shrimp icon"
              width={90}
              height={90}
            />
          </figure>
          <h3 className="text-primary-darkest mt-3 uppercase">
            Preferences and allergies
          </h3>
          <p>
            Aunt Fatima is vegan, Uncle John can't do nuts. Knytkalas tracks
            both and flags every dish that clashes.
          </p>
        </AboutCard>
        <AboutCard>
          <figure className="bg-card-background -mt-20 rounded-full p-5 shadow transition-transform duration-300 hover:-rotate-6">
            <Image
              src={"/graphics/icon_event.svg"}
              alt="Event icon"
              width={90}
              height={90}
            />
          </figure>
          <h3 className="text-primary-darkest uppercase">Easy overview</h3>
          <p>
            Who is bringing kids, has Susan answered, is the dessert table
            covered? One screen answers all of it.
          </p>
        </AboutCard>{" "}
        <AboutCard>
          <figure className="bg-card-background -mt-20 rounded-full p-5 shadow transition-transform duration-300 hover:rotate-6">
            <Image
              src={"/graphics/icon_contribution.svg"}
              alt="Food contribution icon"
              width={90}
              height={90}
            />
          </figure>
          <h3 className="text-primary-darkest uppercase"> Skip the doubles</h3>
          <p>
            Guests register their dish, how much of it and what's in it. We
            can't promise a balanced menu, but the odds are improved!
          </p>
        </AboutCard>
      </div>
    </section>
  );
}
