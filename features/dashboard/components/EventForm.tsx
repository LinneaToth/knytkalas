import Form from "next/form";
import Button from "@/ui/components/Button";
import { formatDate } from "../utils/formatDate";

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
        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        defaultValue={eventData?.description}
        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Location"
        defaultValue={eventData?.location}
        className="bg-background text-foreground focus:bg-focus w-full p-3"
      />

      <label htmlFor="date">Date & start time *</label>
      <input
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
      <input
        type="date"
        name="responseDeadline"
        id="responseDeadline"
        className="w-full"
      />

      <Button>{eventData ? "Update event" : "Create Event"}</Button>
    </Form>
  );
}
