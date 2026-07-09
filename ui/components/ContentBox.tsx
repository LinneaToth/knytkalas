import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ContentBox({ children }: Props) {
  return (
    <section className="bg-card-background text-foreground mt-10 flex flex-col items-center justify-center gap-10 rounded-xl p-10 py-10 drop-shadow">
      {children}
    </section>
  );
}
