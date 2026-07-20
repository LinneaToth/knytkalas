"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestList from "./GuestList";
import CreateInvite from "./CreateInvite";
import Button from "@/ui/components/Button";
import { toggleCancelEvent } from "../services/toggleCancelEvent";
import { getEventDetails } from "../services/getEventDetails";

type EventDetails = Awaited<ReturnType<typeof getEventDetails>>;

type Props = {
  event: EventDetails;
  date: string; //Passed as string from server component to forego hydration issues (mismatch between server and client date format), LT 2026-07-20
  time: string;
  role: "host" | "guest";
};

export default function EventDetails({ event, date, time, role }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  if (!event) return <h2>Event data missing</h2>;

  const eventHasBeen = event.date < new Date();

  const handleToggleCancel = async () => {
    await toggleCancelEvent(event.id);
    router.refresh();
  };

  //If user is host, add option to edit event details, like occasion, date, and description
  //if user is not host, add option to RSPV to the event

  return (
    <div>
      <h2>
        {eventHasBeen && "Past event - "}
        {event.deletedAt && "CANCELLED - "}
        {event.occasion}
      </h2>
      <p>{event.description}</p>
      <p className={`${event.deletedAt ? "line-through" : ""}`}>{date}</p>
      <p className={`${event.deletedAt ? "line-through" : ""}`}>
        Start time: {time}
      </p>
      {!eventHasBeen && event.responseDeadline && (
        <p>
          Response deadline: {event.responseDeadline?.toLocaleDateString()}{" "}
          {`(${Math.ceil(
            (new Date(event.responseDeadline).getTime() -
              new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          )} days left)`}
        </p>
      )}
      <p>{event.location}</p>
      <p>Host: {role === "host" ? "This is your event!" : event.hostName}</p>
      <GuestList guests={event.guests} />
      {role === "host" && !eventHasBeen && (
        <>
          {!event.deletedAt && <CreateInvite eventId={event.id} />}
          <Button variant="outline" width="full" onClick={handleToggleCancel}>
            {event.deletedAt ? "RE-PUBLISH EVENT" : "CANCEL EVENT"}
          </Button>
        </>
      )}
    </div>
  );
}
