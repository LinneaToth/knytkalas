import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  styling?: string;
};

export default function ContentBox({ children, styling = "" }: Props) {
  return (
    <section
      className={`bg-card-background text-foreground flex flex-col rounded-xl p-10 py-10 drop-shadow ${styling}`}
    >
      {children}
    </section>
  );
}
