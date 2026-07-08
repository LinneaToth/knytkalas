import { Event as PrismaEvent } from "@/generated/prisma";
import EventCard from "./EventCard";
import { orderByDate } from "../utils/orderByDate";

type Props = {
  events: PrismaEvent[];
};

export default function EventList({ events }: Props) {
  const sortedByDate = orderByDate(events);

  return (
    <div className="flex flex-col gap-5">
      {sortedByDate.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
