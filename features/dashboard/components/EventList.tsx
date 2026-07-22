import EventCard from "./EventCard";
import { orderByDate } from "../utils/orderByDate";
import { getUsersEvents } from "../services/getUsersEvents";

type Props = {
  events: Awaited<ReturnType<typeof getUsersEvents>>;
};

export default function EventList({ events }: Props) {
  const sortedByDate = orderByDate(events);

  return (
    <div className="flex flex-col gap-5">
      {events.length === 0 && <p>You currently have no events.</p>}
      {sortedByDate.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
