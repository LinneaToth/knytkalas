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
      <h2 className="text-primary-darkest uppercase">How it works</h2>{" "}
      <h3 className="text-primary-darkest text-5xl">
        From invite to the last bite
      </h3>
      <p className="max-w-3xl">
        The idea for a potluck app was born after several endless
        Messenger-threads, where participants kept getting lost in and with the
        same questions.
      </p>
      <p className="max-w-3xl">
        Is anybody else bringing salad? Are the vegans covered? Who is going?
        Where is it at? When?
      </p>
      <p className="max-w-3xl">
        Knytkalas.net serves to facilitate for any potluck host and guest,
        keeping the organizational cognitive load to a bare minimum, allocating
        time and energy to be spent on far more enjoyable things than scrolling
        for answers in old chats!
      </p>{" "}
      <div className="my-10 flex flex-col gap-15 md:flex-row md:items-stretch xl:gap-5">
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
            Aunt Fatima is vegan and Uncle John is allergic to nuts. No problem!
            Knytkalas provides easy ways of keeping track of both your guests
            dietary restrictions and displays dietary flags in the event
            contributions.
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
            Who is bringing their kids, has Susan responded to her invite, and
            what is the status of the dessert table? Knytkalas provides a clear
            overview of your event and all its contributions, so you can focus
            on enjoying your party!
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
            Knytkalas lets the guest communicate what they are bringing and how
            much of it, flag their contributions for dietary issues and
            categorize them for easy overview. We don&apos;t guarantee well
            balanced menus on any potluck, but we surely improve the odds!
          </p>
        </AboutCard>
      </div>
    </section>
  );
}
