"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateInvite from "./CreateInvite";
import Button from "@/ui/components/Button";
import { toggleCancelEvent } from "../services/toggleCancelEvent";
import { getEventDetails } from "../services/getEventDetails";
import { Users, CalendarDays, MapPin, Clock10 } from "lucide-react";
import ContentBox from "@/ui/components/ContentBox";
import EventForm from "./EventForm";
import { updateEvent } from "../services/updateEvent";

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

  const onSave = async (formData: FormData) => {
    await updateEvent(event.id, formData);
    setIsEditing(false);
    router.refresh();
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  //If user is host, add option to edit event details, like occasion, date, and description

  if (isEditing) {
    return (
      <ContentBox styling="flex flex-col gap-3 md:col-span-2">
        <h2>Editing Event</h2>
        <EventForm
          handleFormAction={onSave}
          eventData={{
            occasion: event.occasion,
            description: event.description || "",
            location: event.location || "",
            date: event.date,
            responseDeadline: event.responseDeadline ?? undefined,
          }}
        />
        <button onClick={onCancel}>CANCEL</button>
      </ContentBox>
    );
  }

  if (!isEditing) {
    return (
      <ContentBox styling="flex flex-col gap-3 md:col-span-2">
        {role === "host" && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-5 right-5"
          >
            EDIT
          </button>
        )}
        <h2>
          {eventHasBeen && "Past event"}
          {event.deletedAt && "Cancelled event"}
          {!eventHasBeen && !event.deletedAt && "When & Where"}
        </h2>
        {event.description && <p>{event.description}</p>}
        <p className={`${event.deletedAt ? "line-through" : ""} flex gap-3`}>
          {" "}
          <CalendarDays /> {date}
        </p>
        <p className={`${event.deletedAt ? "line-through" : ""} flex gap-3`}>
          <Clock10 />
          Start time: {time}
        </p>
        <p className="flex gap-3">
          <MapPin />{" "}
          {event.location ? event.location : "Location to be decided"}
        </p>

        <p>Hosted by: {role === "host" ? "You! " : event.hostName}</p>

        {role === "host" && !eventHasBeen && (
          <>
            <Button variant="outline" width="full" onClick={handleToggleCancel}>
              {event.deletedAt ? "RE-PUBLISH EVENT" : "CANCEL EVENT"}
            </Button>
          </>
        )}
      </ContentBox>
    );
  }
}
