"use client";
import { useActionState } from "react";
import { createEvent } from "../../services/createEvent";
import EventForm from "./EventForm";
import type { EventFormFields } from "../../utils/eventFormFields";

type CreateState = { error: string; fields: EventFormFields } | undefined;

export default function CreateEvent() {
  //On success createEvent redirects to the new event, so the state only ever holds an expected error
  const handleCreate = async (prevState: CreateState, formData: FormData) => {
    return await createEvent(formData);
  };

  const [state, createAction, isCreating] = useActionState(
    handleCreate,
    undefined,
  );

  return (
    <>
      <EventForm
        handleFormAction={createAction}
        mode="create"
        eventData={state?.fields}
        pending={isCreating}
      />
      {state?.error && <p className="text-error">{state.error}</p>}
    </>
  );
}
