"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { createInvite } from "../services/createInvite";
import Button from "@/ui/components/Button";

export default function CreateInvite({ eventId }: { eventId: number }) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setIsActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  const toggleActive = () => {
    setIsActive((oldStatus) => !oldStatus);
  };

  const handleFormAction = async (formData: FormData): Promise<void> => {
    try {
      await createInvite(formData);
      setSuccess(true);
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (!isActive) {
    return (
      <Button onClick={toggleActive} variant="outline">
        Create new invite
      </Button>
    );
  }

  if (error) {
    return (
      <div className="bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-l py-10 drop-shadow">
        <h2>Something went wrong</h2>
        <span>{error}</span>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-card-background text-foreground mt-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-l py-10 drop-shadow">
        <h2>Invite was created!</h2>
        <button
          onClick={() => {
            toggleActive();
            setSuccess(false);
          }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <Form
      action={handleFormAction}
      className={
        "text-foreground mt-5 flex w-full flex-col items-start justify-start gap-5"
      }
    >
      <h3>Invite guest</h3>
      <label htmlFor="guestName">Name</label>
      <input
        type="text"
        name="guestName"
        id="guestName"
        placeholder="Joe Jonsson"
        required
        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />
      <input type="hidden" name="eventId" value={eventId} />
      <Button>Create invite</Button>{" "}
      <Button
        onClick={() => {
          toggleActive();
          setSuccess(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
