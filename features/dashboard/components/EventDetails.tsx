"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateInvite from "./CreateInvite";
import Button from "@/ui/components/Button";
import { toggleCancelEvent } from "../services/toggleCancelEvent";
import { getEventDetails } from "../services/getEventDetails";
import { Users, CalendarDays, MapPin, Clock10 } from "lucide-react";
import ContentBox from "@/ui/components/ContentBox";

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
    <ContentBox styling="flex flex-col gap-6 rounded-2xl shadow-md md:col-span-2">
      <h2>
        {eventHasBeen && "Past event"}
        {event.deletedAt && "Cancelled event"}
        {!eventHasBeen && !event.deletedAt && "When & Where"}
      </h2>
      <p>{event.description}</p>
      <p className={`${event.deletedAt ? "line-through" : ""} flex gap-3`}>
        {" "}
        <CalendarDays /> {date}
      </p>
      <p className={`${event.deletedAt ? "line-through" : ""} flex gap-3`}>
        <Clock10 />
        Start time: {time}
      </p>
      <p className="flex gap-3">
        <MapPin /> {event.location ? event.location : "Location to be decided"}
      </p>

      <p>Hosted by: {role === "host" ? "You! " : event.hostName}</p>

      {role === "host" && !eventHasBeen && (
        <>
          {!event.deletedAt && <CreateInvite eventId={event.id} />}
          <Button variant="outline" width="full" onClick={handleToggleCancel}>
            {event.deletedAt ? "RE-PUBLISH EVENT" : "CANCEL EVENT"}
          </Button>
        </>
      )}
    </ContentBox>
  );
}
