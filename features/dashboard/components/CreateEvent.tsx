"use client";
import Link from "next/link";
import { useState } from "react";
import { createEvent } from "../services/createEvent";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [eventId, setEventId] = useState<number | null>(null);

  const handleFormAction = async (formData: FormData): Promise<void> => {
    try {
      const event = await createEvent(formData);
      setEventId(event.id);
      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (error) {
    return (
      <div className="bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-10 drop-shadow">
        <h2>Something went wrong</h2>
        <span>{error}</span>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-10 drop-shadow">
        <h2>Event created successfully!</h2>
        <Link href={`/dashboard/events/${eventId}`}>See event</Link>
      </div>
    );
  }

  return <EventForm handleFormAction={handleFormAction} />;
}
