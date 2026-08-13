import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  styling?: string;
  glass?: boolean;
};

export default function ContentBox({
  children,
  styling = "",
  glass = false,
}: Props) {
  return (
    <section
      className={`text-foreground flex flex-col rounded-l p-10 transition-all duration-300 ${
        glass
          ? "bg-card-background/50 border border-white/20 shadow-xl shadow-black/5 backdrop-blur-md backdrop-saturate-105"
          : "bg-card-background shadow-md"
      } ${styling} `}
    >
      {children}
    </section>
  );
}
