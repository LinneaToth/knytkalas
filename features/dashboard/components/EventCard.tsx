import { Event as PrismaEvent } from "@/generated/prisma";
import { borderColor } from "../utils/borderColor";

type Props = {
  event: PrismaEvent;
};

export default function EventCard({ event }: Props) {
  const { occasion, date } = event;
  const accent = borderColor(date);

  return (
    <article
      className={`bg-card-background text-foreground rounded-xl border-l-10 px-5 py-2 drop-shadow ${accent} cursor-pointer`}
    >
      <h2>{occasion}</h2>
      <p>{date.toLocaleDateString()}</p>
    </article>
  );
}
