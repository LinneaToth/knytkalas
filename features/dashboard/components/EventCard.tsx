import Link from "next/link";
import { borderColor } from "../utils/borderColor";
import { getUsersEvents } from "../services/getUsersEvents";
import GuestsIcon from "./GuestsIcon";
import ResponseStatus from "./ResponseStatus";
import { Users, CalendarDays, MapPin } from "lucide-react";

type Props = {
  event: Awaited<ReturnType<typeof getUsersEvents>>[number];
};

export default function EventCard({ event }: Props) {
  if (!event) return <></>;

  const { occasion, date, deletedAt, id } = event;
  const accent = borderColor(event);

  return (
    <Link href={`/dashboard/events/${id}`} key={event.occasion + event.id}>
      <article
        className={`bg-card-background text-foreground rounded-xl border-l-10 px-5 py-2 drop-shadow ${accent} grid cursor-pointer grid-cols-4 grid-rows-2 gap-5`}
      >
        <header className="col-span-3 col-start-1 row-span-1 row-start-1">
          <h2>
            {deletedAt && "Cancelled: "}
            {occasion}
          </h2>{" "}
          {event.role === "guest" && <h3>Hosted by {event.hostName}</h3>}{" "}
        </header>
        <span className="col-span-1 col-start-4 row-span-1 row-start-1 flex w-full flex-wrap justify-center gap-1">
          <div className="flex w-full items-center justify-center">
            <Users /> -
            {event.guestsAccepted + event.guestsDeclined + event.guestsPending}{" "}
            invited
          </div>
          <GuestsIcon amt={event.guestsAccepted} status="GOING" />
          <GuestsIcon amt={event.guestsPending} status="PENDING" />
          <GuestsIcon amt={event.guestsDeclined} status="DECLINED" />
        </span>
        <section className="col-span-4 col-start-1 row-start-2 flex flex-col gap-3">
          {" "}
          <p className={`${deletedAt && "line-through"} flex gap-3`}>
            <CalendarDays />
            {date.toLocaleDateString()}
          </p>
          <p className="flex gap-3">
            <MapPin />
            {event.location ? event.location : "Location to be decided"}
          </p>
          <p className={`${deletedAt && "line-through"} `}></p>
          {event.usersGuests > 1 && (
            <p>You are bringing {event.usersGuests - 1} people.</p>
          )}
        </section>
        <section className="col-span-1 col-start-4 row-start-2">
          <ResponseStatus role={event.role} status={event.acceptedStatus} />
        </section>
      </article>
    </Link>
  );
}
