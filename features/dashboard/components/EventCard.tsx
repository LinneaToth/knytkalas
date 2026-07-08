import { EventData } from "@/types/entityTypes";
import { borderColor } from "../utils/borderColor";

type Props = {
  event: EventData;
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
