import { ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Accent = "primary" | "going" | "declined" | "archive" | "invite";

type Props = {
  children: ReactNode;
  styling?: string;
  glass?: boolean;
  elevation?: "flat" | "resting" | "raised";
  accent?: Accent;
  loading?: boolean;
};

export default function ContentBox({
  children,
  styling = "",
  glass = false,
  elevation = "resting",
  accent,
  loading = false,
}: Props) {
  const accentClass: Record<Accent, string> = {
    primary: "bg-accent",
    going: "bg-success",
    declined: "bg-error",
    archive: "bg-inactive/40",
    invite: "bg-linear-to-r from-primary via-accent to-secondary",
  };

  const surface = glass
    ? "bg-card-background/70 backdrop-blur-md backdrop-saturate-[1.1] ring-1 ring-inset ring-white/60 shadow-[0_20px_40px_-16px_rgba(48,76,137,0.20)]"
    : {
        flat: "bg-card-background ring-1 ring-inset ring-primary-darkest/20",
        resting:
          "bg-card-background shadow-[0_6px_16px_-4px_rgba(48,76,137,0.16)]",
        raised:
          "bg-card-background shadow-[0_20px_40px_-14px_rgba(48,76,137,0.30)]",
      }[elevation];

  return (
    <section
      className={`text-foreground flex flex-col rounded-3xl p-6 transition-all duration-300 md:p-10 ${
        accent ? "relative overflow-hidden" : ""
      } ${surface} ${styling}`}
    >
      {loading && (
        <div className="bg-card-background/50 absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-3xl backdrop-blur-md">
          <LoadingSpinner />
        </div>
      )}
      {accent && (
        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${accentClass[accent]}`}
        />
      )}
      {children}
    </section>
  );
}
