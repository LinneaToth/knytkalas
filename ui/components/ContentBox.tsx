import { ReactNode } from "react";

type Accent = "primary" | "going" | "declined" | "archive" | "invite";

type Props = {
  children: ReactNode;
  styling?: string;
  glass?: boolean;
  elevation?: "flat" | "resting" | "raised";
  accent?: Accent;
};

export default function ContentBox({
  children,
  styling = "",
  glass = false,
  elevation = "resting",
  accent,
}: Props) {
  const accentClass: Record<Accent, string> = {
    primary: "bg-accent",
    going: "bg-success",
    declined: "bg-error",
    archive: "bg-inactive/40",
    invite: "bg-linear-to-r from-primary via-accent to-secondary",
  };

  const surface = glass
    ? "bg-card-background/50 backdrop-blur-md backdrop-saturate-[1.1] ring-1 ring-inset ring-white/50 shadow-[0_20px_40px_-16px_rgba(48,76,137,0.20)]"
    : {
        flat: "bg-card-background ring-1 ring-inset ring-primary-darkest/20",
        resting:
          "bg-card-background shadow-[0_6px_16px_-4px_rgba(48,76,137,0.16)]",
        raised:
          "bg-card-background shadow-[0_20px_40px_-14px_rgba(48,76,137,0.30)]",
      }[elevation];

  return (
    <section
      className={`text-foreground flex flex-col rounded-3xl p-5 transition-all duration-300 md:px-8 md:py-[30px] ${
        accent ? "relative overflow-hidden" : ""
      } ${surface} ${styling}`}
    >
      {accent && (
        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${accentClass[accent]}`}
        />
      )}
      {children}
    </section>
  );
}
