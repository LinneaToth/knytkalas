"use client";
import InfoModal from "@/ui/components/InfoModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: Props) {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <h1>About</h1>
      <p>Last updated: 2026-08-21</p>
      <p className="bg-primary-darkest w-auto rounded-full text-center text-white">
        THIS PROJECT IS STILL A WORK IN PROGRESS, DEADLINE IS IN DECEMBER 2026
      </p>
      <p>
        Knytkalas.net is my graduation project ("examensarbete") for the{" "}
        <a
          className="underline"
          href="https://www.boras.se/utbildningochforskola/yrkeshogskolaniboras/program/frontendutvecklarereactdistans.4.5c8e67e919bd49098c771b3.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Frontendutvecklare React program at Yrkeshögskolan i Borås
        </a>
        , A 400 YHp, two-year higher vocational education in frontend and
        fullstack development. The program covers user experience and
        interaction design, JavaScript/TypeScript programming, React, app
        development, agile ways of working, database technology with SQL and
        MongoDB, and backend programming with Node.js and Express, alongside two
        internship periods (LIA).
      </p>
      <p>
        For my degree project, I wanted to build something that solved a problem
        I have been running into: The chaos of coordinating a potluck over a
        Messenger thread, where nobody can tell who is bringing what, who is
        avoiding which ingredient, or who is even coming. Knytkalas is my answer
        to that.
      </p>
      <p>
        I also used this project to push past what the curriculum strictly
        requires. I designed and built the full stack myself: The data model,
        authentication, and server logic alongside the frontend, with Next.js,
        TypeScript, Prisma, PostgreSQL, Better Auth and Tailwind. It was a
        deliberate choice to demonstrate fullstack ability, not just the
        frontend specialization the program is named for. I also took it a step
        further into unknown territory, by using different tech than what was
        covered in the education.
      </p>
      <p>
        This final project permits AI-assisted work. I have used Claude and
        Gemini deliberately: As an architecture sounding board, a debugging
        partner, and a reviewer of my own code. I cherish understanding and
        craftsmanship; the actual implementation stays mine. On a few narrow,
        explicitly scoped occasions (restyling specific UI flows to match an
        established design pattern) I had Claude write and implement the code
        directly, as a conscious choice to showcase my ability to effectively
        collaborate with generative AI.
      </p>
      <p>
        The full source code is public on GitHub:{" "}
        <a
          href="https://github.com/LinneaToth/knytkalas"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          github.com/LinneaToth/knytkalas
        </a>
        .
      </p>
      <p className="italic">~ Linnéa</p>
    </InfoModal>
  );
}
