"use client";

import { useState, useTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import { toggleCancelEvent } from "../../services/toggleCancelEvent";
import { getEventDetails } from "../../services/getEventDetails";
import { Pencil, CalendarDays, MapPin, Clock10 } from "lucide-react";
import ContentBox from "@/ui/components/ContentBox";
import EventForm from "./EventForm";
import { updateEvent } from "../../services/updateEvent";
import { formatDate } from "../../utils/formatDate";
import type { EventFormFields } from "../../utils/eventFormFields";

//getEventDetails returns null when there is no event, but events/[id]/page.tsx calls notFound() in that case, so this component never receives null. NonNullable removes null from the type
type EventDetails = NonNullable<Awaited<ReturnType<typeof getEventDetails>>>;

type SaveState = { error: string; fields: EventFormFields } | undefined;

type Props = {
  event: EventDetails;
  date: string; //Passed as string from server component to forego hydration issues (mismatch between server and client date format), LT 2026-07-20
  time: string;
  role: "host" | "guest";
};

export default function EventDetails({ event, date, time, role }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isToggling, startToggleTransition] = useTransition();
  const router = useRouter();

  const eventHasBeen = event.date < new Date();

  //toggleCancelEvent has no expected errors to return, so no error state. The transition gives a pending state and lets thrown errors reach the nearest error boundary
  const handleToggleCancel = () => {
    startToggleTransition(async () => {
      await toggleCancelEvent(event.id);
      router.refresh();
    });
  };

  const handleSave = async (prevState: SaveState, formData: FormData) => {
    const updatedEvent = await updateEvent(event.id, formData);
    if (updatedEvent?.error) return updatedEvent;
    setIsEditing(false);
    router.refresh();
  };

  const [saveState, saveAction, isSaving] = useActionState(
    handleSave,
    undefined,
  );

  const onCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ContentBox styling="flex flex-col gap-3 md:col-span-2" glass={true}>
        <h2>Editing Event</h2>
        <EventForm
          handleFormAction={saveAction}
          mode="edit"
          //After an expected error: what the user typed. Otherwise: the saved event, formatted the way the inputs expect
          eventData={
            saveState?.fields ?? {
              occasion: event.occasion,
              description: event.description || "",
              location: event.location || "",
              date: formatDate(event.date),
              responseDeadline: event.responseDeadline
                ? formatDate(event.responseDeadline).slice(0, 10) //date input wants YYYY-MM-DD
                : "",
            }
          }
          pending={isSaving}
          onCancel={onCancel}
        />
        {saveState?.error && <p className="text-error">{saveState.error}</p>}
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
        <article className="flex w-full flex-col items-stretch gap-3 py-5 xl:flex-row">
          <div
            className={`${event.deletedAt ? "line-through" : ""} bg-card-background/60 flex items-center gap-3 rounded-2xl p-5 xl:flex-1`}
          >
            <figure className="icon-figure-success">
              <CalendarDays color="white" />
            </figure>{" "}
            {date}
          </div>
          <div
            className={`${event.deletedAt ? "line-through" : ""} bg-card-background/60 flex items-center gap-3 rounded-2xl p-5 xl:flex-1`}
          >
            <figure className="icon-figure-success">
              {" "}
              <Clock10 color="white" />
            </figure>
            Start time: {time}
          </div>
          <div className="bg-card-background/60 flex items-center gap-3 rounded-2xl p-5 xl:flex-1">
            <figure className="icon-figure-success">
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
              loading={isToggling}
            >
              {event.deletedAt ? "Re-publish event" : "Cancel event"}
            </Button>
          </div>
        )}
      </ContentBox>
    );
  }
}
