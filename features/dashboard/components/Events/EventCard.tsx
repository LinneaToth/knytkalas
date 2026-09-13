import Link from "next/link";
import { spineColor } from "../../utils/spineColor";
import { getUsersEvents } from "../../services/getUsersEvents";
import {
  Watch,
  CalendarDays,
  MapPin,
  ChevronRight,
  Utensils,
} from "lucide-react";
import ResponseStatus from "./ResponseStatus";
import ContentBox from "@/ui/components/ContentBox";
import Pill from "@/ui/components/Pill";

type Props = {
  event: Awaited<ReturnType<typeof getUsersEvents>>[number];
};

export default function EventCard({ event }: Props) {
  if (!event) return <></>;

  const { occasion, date, deletedAt, id, description } = event;
  const accent = spineColor(event);

  const userInvite = event.invites.find(
    (invite) => invite.guestId === event.userId,
  );
  const usersStatus = userInvite?.status;
  const contributionNames = userInvite?.contributions?.map((c) => c.name) || [];
  const eventDeleted = event.deletedAt !== null;

  return (
    <Link href={`/dashboard/events/${id}`} key={event.occasion + event.id}>
      <ContentBox
        styling="md:flex-row cursor-pointer transition duration-300 hover:scale-101 ease-in-out "
        elevation="raised"
        glass={true}
      >
        {" "}
        <div
          className={`hidden h-2 w-full rounded-full md:block md:h-auto md:w-2 ${accent}`}
        ></div>
        <article
          className={`text-foreground grid flex-1 grid-cols-2 grid-rows-4 gap-3 px-6 md:grid-rows-3`}
        >
          <header className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col">
            <h2 className="uppercase">
              {eventDeleted && "Cancelled: "}
              {occasion}
            </h2>
            <p className="mt-5">{description}</p>{" "}
          </header>{" "}
          <div className="col-start-2 row-start-1 ml-auto inline-flex gap-3 self-start">
            <ResponseStatus
              perspective="self"
              isHost={event.role === "host"}
              status={usersStatus}
              eventStatus={eventDeleted ? "CANCELLED" : "ACTIVE"}
            />
          </div>
          {event.role === "guest" && <h3>Hosted by {event.hostName}</h3>}{" "}
          <span className="col-span-2 col-start-1 row-span-1 row-start-3 flex w-full flex-col flex-wrap justify-center gap-3 md:col-span-1 md:col-start-2 md:row-start-2">
            <h3>Guests</h3>
            <div className="flex flex-row gap-3">
              {event.guestsAccepted > 0 && (
                <Pill tone="success"> {event.guestsAccepted} going</Pill>
              )}
              {event.guestsPending > 0 && (
                <Pill tone="neutral"> {event.guestsPending} pending</Pill>
              )}
              {event.guestsDeclined > 0 && (
                <Pill tone="error"> {event.guestsDeclined} declined</Pill>
              )}
            </div>
          </span>
          <section className="col-span-1 col-start-1 row-start-2 flex flex-col gap-3">
            <h3>When</h3>
            <p
              className={`${deletedAt && "line-through"} flex flex-col gap-3 md:flex-row`}
            >
              <span className="flex gap-3">
                <CalendarDays />
                {date.toLocaleDateString()}
              </span>
              <span className="flex gap-3">
                <Watch /> {date.toLocaleTimeString().slice(0, -3)}
              </span>
            </p>
          </section>{" "}
          <section className="col-span-1 row-start-2 flex flex-col gap-3 md:col-start-1 md:row-start-3">
            <h3>Where</h3>
            <p className="flex gap-3">
              <MapPin />
              {event.location ? event.location : "Location to be decided"}
            </p>
            <p className={`${deletedAt && "line-through"} `}></p>
          </section>
          <section className="col-span-2 col-start-1 row-span-1 row-start-4 flex flex-col gap-3 md:col-span-1 md:col-start-2 md:row-start-3">
            {" "}
            <h3>Your contributions</h3>
            <p className="flex flex-row gap-3">
              <Utensils />{" "}
              {contributionNames.length >= 1
                ? contributionNames.join(", ")
                : "None yet!"}
            </p>
          </section>
        </article>
        <div className={`hidden w-6 items-center md:flex`}>
          <ChevronRight size="24" />
        </div>
      </ContentBox>
    </Link>
  );
}
