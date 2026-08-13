import Link from "next/link";
import { borderColor } from "../utils/borderColor";
import { getUsersEvents } from "../services/getUsersEvents";
import { Watch, CalendarDays, MapPin } from "lucide-react";
import ResponseStatus from "./ResponseStatus";

type Props = {
  event: Awaited<ReturnType<typeof getUsersEvents>>[number];
};

export default function EventCard({ event }: Props) {
  if (!event) return <></>;

  const { occasion, date, deletedAt, id, description } = event;
  const accent = borderColor(event);

  const userInvite = event.invites.find(
    (invite) => invite.guestId === event.userId,
  );
  const usersStatus = userInvite?.status;
  const contributionNames = userInvite?.contributions?.map((c) => c.name) || [];

  return (
    <Link href={`/dashboard/events/${id}`} key={event.occasion + event.id}>
      <article
        className={`bg-card-background text-foreground rounded-l border-l-10 p-10 drop-shadow ${accent} grid cursor-pointer grid-cols-2 grid-rows-4 gap-3 md:grid-rows-3`}
      >
        <header className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col">
          <h2 className="uppercase">
            {deletedAt && "Cancelled: "}
            {occasion}
          </h2>
          <p className="mt-5">{description}</p>{" "}
        </header>{" "}
        <div className="col-start-2 row-start-1 ml-auto inline-flex gap-3">
          <ResponseStatus status={usersStatus} role={event.role} />
          {event.role === "host" && (
            <span className="bg-primary-darkest text-foreground-light flex h-8 w-15 items-center justify-center rounded-xl px-2 py-1 text-xs font-medium shadow-sm">
              Host
            </span>
          )}
        </div>
        {event.role === "guest" && <h3>Hosted by {event.hostName}</h3>}{" "}
        <span className="col-span-2 col-start-1 row-span-1 row-start-3 flex w-full flex-col flex-wrap justify-center gap-1 md:col-span-1 md:col-start-2 md:row-start-2">
          <h3>Guest summary</h3>
          {event.guestsAccepted} going | {event.guestsPending} pending |{" "}
          {event.guestsDeclined} declined
        </span>
        <section className="col-span-1 col-start-1 row-start-2 flex flex-col gap-3">
          <h3>Date and time</h3>
          <p className={`${deletedAt && "line-through"} flex gap-3`}>
            <CalendarDays />
            {date.toLocaleDateString()} <Watch />{" "}
            {date.toLocaleTimeString().slice(0, -3)}
          </p>
        </section>{" "}
        <section className="col-span-1 row-start-2 flex flex-col gap-3 md:col-start-1 md:row-start-3">
          <h3>Location</h3>
          <p className="flex gap-3">
            <MapPin />
            {event.location ? event.location : "Location to be decided"}
          </p>
          <p className={`${deletedAt && "line-through"} `}></p>
        </section>
        <section className="col-span-2 col-start-1 row-span-1 row-start-4 flex flex-col gap-1 md:col-span-1 md:col-start-2 md:row-start-3">
          {" "}
          <h3>Your participation</h3>
          <p>
            Contributions:{" "}
            {contributionNames.length >= 1
              ? contributionNames.join(", ")
              : "None yet!"}
          </p>
          {event.usersGuests > 1 && usersStatus === "GOING" && (
            <p>You are bringing {event.usersGuests - 1} extra people.</p>
          )}
        </section>
        <section className="col-span-2 col-start-1 row-start-4 flex items-start"></section>
      </article>
    </Link>
  );
}
