import Link from "next/link";
import EventCard from "./EventCard";
import { orderByDate } from "../../utils/orderByDate";
import { getUsersEvents } from "../../services/getUsersEvents";

type Props = {
  events: Awaited<ReturnType<typeof getUsersEvents>>;
};

export default function EventList({ events }: Props) {
  const sortedByDate = orderByDate(events);

  return (
    <div className="flex flex-col gap-5">
      {events.length === 0 && <p>You currently have no events.</p>}
      {sortedByDate.map((event) => (
        <Link
          href={`/dashboard/events/${event.id}`}
          key={event.occasion + event.id}
        >
          <EventCard
            key={event.id}
            event={event}
            dateString={event.date.toLocaleDateString("sv-SE")} //passed as prop to remedy hydration error
            timeString={event.date.toLocaleTimeString("sv-SE").slice(0, -3)} //passed as prop to remedy hydration error
          />
        </Link>
      ))}
    </div>
  );
}
