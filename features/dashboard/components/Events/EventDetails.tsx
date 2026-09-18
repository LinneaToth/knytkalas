"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import { toggleCancelEvent } from "../../services/toggleCancelEvent";
import { getEventDetails } from "../../services/getEventDetails";
import { Pencil, CalendarDays, MapPin, Clock10 } from "lucide-react";
import ContentBox from "@/ui/components/ContentBox";
import EventForm from "./EventForm";
import { updateEvent } from "../../services/updateEvent";

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
      <ContentBox styling="flex flex-col gap-3 md:col-span-2" glass={true}>
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
      <ContentBox styling="flex flex-col gap-5 md:col-span-2" glass={true}>
        <h2 className="mr-auto uppercase">
          {eventHasBeen && `We hope you had a good time!`}
          {event.deletedAt && "Cancelled event"}
          {!eventHasBeen && !event.deletedAt && "When & Where"}
        </h2>

        {event.description && <p>{event.description}</p>}
        <article className="flex w-full flex-col items-stretch gap-3 py-5 md:justify-between xl:flex-row">
          <div
            className={`${event.deletedAt ? "line-through" : ""} bg-card-background/60 2xl flex items-center gap-3 rounded-2xl p-5 2xl:min-w-60`}
          >
            <figure className="icon-figure">
              <CalendarDays color="white" />
            </figure>{" "}
            {date}
          </div>
          <div
            className={`${event.deletedAt ? "line-through" : ""} bg-card-background/60 2xl flex items-center gap-3 rounded-2xl p-5 2xl:min-w-60`}
          >
            <figure className="icon-figure">
              {" "}
              <Clock10 color="white" />
            </figure>
            Start time: {time}
          </div>
          <div className="bg-card-background/60 2xl flex items-center gap-3 rounded-2xl p-5 2xl:min-w-60">
            <figure className="icon-figure">
              <MapPin color="white" />
            </figure>{" "}
            {event.location ? event.location : "Location to be decided"}
          </div>
        </article>

        <p>Hosted by: {role === "host" ? "You! " : event.hostName}</p>
        {role === "host" && !eventHasBeen && (
          <div className="flex w-full justify-end gap-3">
            <Button
              hoverMove={false}
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="secondary"
            >
              <Pencil size={15} /> Edit
            </Button>

            <Button
              hoverMove={false}
              variant="secondary"
              size="sm"
              onClick={handleToggleCancel}
            >
              {event.deletedAt ? "Re-publish event" : "Cancel event"}
            </Button>
          </div>
        )}
      </ContentBox>
    );
  }
}
