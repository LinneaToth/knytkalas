"use client";
import { useState, useEffect, useActionState } from "react";
import Form from "next/form";
import { createInvite } from "../services/createInvite";
import Button from "@/ui/components/Button";

type CreateState = { error: string } | undefined;

export default function CreateInvite({ eventId }: { eventId: number }) {
  const [isActive, setIsActive] = useState(false);
  const [success, setSuccess] = useState(false);

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

  //Expected errors are returned and shown in the form. Thrown errors reach the nearest error boundary. No router.refresh() needed, createInvite calls revalidatePath
  const handleCreate = async (prevState: CreateState, formData: FormData) => {
    const result = await createInvite(formData);
    if (result?.error) return result;
    setSuccess(true);
  };

  //Hooks must be called before the early returns below
  const [state, createAction, isCreating] = useActionState(
    handleCreate,
    undefined,
  );

  if (!isActive) {
    return (
      <Button
        onClick={toggleActive}
        variant="secondary"
        className="w-full md:w-auto md:self-center"
      >
        Create new invite
      </Button>
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
      action={createAction}
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
      {state?.error && <p className="text-error">{state.error}</p>}
      <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-center">
        <Button type="submit" loading={isCreating} className="w-full md:w-auto">
          Create invite
        </Button>
        {/* type="button" so it doesn't submit the form it's inside */}
        <Button
          type="button"
          onClick={() => {
            toggleActive();
            setSuccess(false);
          }}
          disabled={isCreating}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
