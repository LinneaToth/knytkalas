import Form from "next/form";
import Button from "@/ui/components/Button";
import DateField from "../../../../ui/components/DateField";
import { formatDate } from "../../utils/formatDate";

type Props = {
  handleFormAction: (formData: FormData) => Promise<void>;
  eventData?: {
    occasion?: string;
    description?: string;
    location?: string;
    date?: Date;
    responseDeadline?: Date;
  };
};

export default function EventForm({ handleFormAction, eventData }: Props) {
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
        defaultValue={
          eventData?.date instanceof Date
            ? formatDate(eventData.date)
            : undefined
        }
        className="w-full"
        required
      />

      <label htmlFor="responseDeadline">Respond by latest </label>
      <DateField
        type="date"
        name="responseDeadline"
        id="responseDeadline"
        className="w-full"
      />

      <Button variant="dark">
        {eventData ? "Update event" : "Create Event"}
      </Button>
    </Form>
  );
}
