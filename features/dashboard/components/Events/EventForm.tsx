import Form from "next/form";
import Button from "@/ui/components/Button";
import DateField from "../../../../ui/components/DateField";
import type { EventFormFields } from "../../utils/eventFormFields";

type Props = {
  handleFormAction: (formData: FormData) => void | Promise<void>;
  mode: "create" | "edit";
  //Strings in the same format the inputs use. React 19 resets the form to these after every action, so after an expected error they should be what the user typed
  eventData?: Partial<EventFormFields>;
  pending?: boolean;
  onCancel?: () => void; //Optional, only shown when editing. Lives in here so it can share a row with the submit button
};

export default function EventForm({
  handleFormAction,
  mode,
  eventData,
  pending,
  onCancel,
}: Props) {
  return (
    <Form
      action={handleFormAction}
      className={
        "flex w-full cursor-pointer flex-col items-start justify-start gap-5"
      }
    >
      <label htmlFor="occasion">Occasion *</label>
      <input
        type="text"
        name="occasion"
        id="occasion"
        placeholder="Occasion"
        required
        defaultValue={eventData?.occasion}
        className="input-field"
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        defaultValue={eventData?.description}
        className="input-field"
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Location"
        defaultValue={eventData?.location}
        className="input-field"
      />

      <label htmlFor="date">Date & start time *</label>
      <DateField
        type="datetime-local"
        name="date"
        id="date"
        defaultValue={eventData?.date}
        className="w-full"
        required
      />

      <label htmlFor="responseDeadline">Respond by latest </label>
      <DateField
        type="date"
        name="responseDeadline"
        id="responseDeadline"
        defaultValue={eventData?.responseDeadline}
        className="w-full"
      />

      <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-center">
        <Button
          type="submit"
          variant="dark"
          loading={pending}
          className="w-full md:w-auto"
        >
          {mode === "edit" ? "Update event" : "Create event"}
        </Button>
        {onCancel && (
          //type="button" so it doesn't submit the form it's inside
          <Button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}
