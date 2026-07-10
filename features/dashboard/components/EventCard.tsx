import Link from "next/link";
import { EventData } from "@/types/entityTypes";
import { borderColor } from "../utils/borderColor";

type Props = {
  event: EventData;
};

export default function EventCard({ event }: Props) {
  const { occasion, date, deletedAt, id } = event;
  const accent = borderColor(event);

  return (
    <Link href={`/dashboard/events/${id}`}>
      <article
        className={`bg-card-background text-foreground rounded-xl border-l-10 px-5 py-2 drop-shadow ${accent} cursor-pointer`}
      >
        <h2>
          {deletedAt && "Cancelled: "}
          {occasion}
        </h2>
        <p className={`${deletedAt && "line-through"} `}>
          {date.toLocaleDateString()}
        </p>
      </article>
    </Link>
  );
}
