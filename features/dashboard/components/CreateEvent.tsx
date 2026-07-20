"use client";
import Link from "next/link";
import Form from "next/form";
import { useState } from "react";
import { createEvent } from "../services/createEvent";
import Button from "@/ui/components/Button";

export default function CreateEvent() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [eventId, setEventId] = useState<number | null>(null);

  const toggleActive = () => {
    setIsActive((oldStatus) => !oldStatus);
  };

  const handleFormAction = async (formData: FormData): Promise<void> => {
    try {
      const event = await createEvent(formData);
      setEventId(event.id);
      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (!isActive) {
    return (
      <button
        onClick={toggleActive}
        className={
          "bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-5 drop-shadow"
        }
      >
        <div className="from-primary to-primary-darker flex size-20 items-center justify-center rounded-full bg-radial-[at_25%_25%] text-8xl text-white">
          +
        </div>
      </button>
    );
  }

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

  return (
    <Form
      action={handleFormAction}
      className={
        "bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-start justify-start gap-5 rounded-xl p-10 drop-shadow"
      }
    >
      <label htmlFor="occasion">Occasion (required)</label>
      <input
        type="text"
        name="occasion"
        id="occasion"
        placeholder="Occasion"
        required

        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />

      <label htmlFor="description">Description (optional)</label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />

      <label htmlFor="date">Date & start time (required)</label>
      <input
        type="datetime-local"
        name="date"
        id="date"
        className="w-full"
        required
      />

      <label htmlFor="responseDeadline">Respond by latest (optional)</label>
      <input
        type="date"
        name="responseDeadline"
        id="responseDeadline"
        className="w-full"
      />

      <Button>Create Event</Button>
    </Form>
  );
}
