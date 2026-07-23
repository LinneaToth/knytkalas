import ContentBox from "@/ui/components/ContentBox";
import PercentageBar from "@/ui/components/PercentageBar";
import GuestList from "./GuestList";
import { getEventDetails } from "../services/getEventDetails";
import CreateInvite from "./CreateInvite";

type Props = {
  event: Awaited<ReturnType<typeof getEventDetails>>;
  role: "host" | "guest";
};

export default function GuestsDetails({ event, role }: Props) {
  if (!event) return <></>;

  const guestData = [
    {
      label: "Attending",
      amount: event.guestsAccepted,
      color: "var(--success)",
    },
    {
      label: "Not Attending",
      amount: event.guestsDeclined,
      color: "var(--accent)",
    },
    { label: "Pending", amount: event.guestsPending, color: "var(--primary)" },
  ];

  return (
    <ContentBox styling="gap-2">
      <h2>Guests</h2> <PercentageBar data={guestData} />
      <p>
        Attending: {event.guestsAccepted} /{" "}
        {event.guestsAccepted + event.guestsPending + event.guestsDeclined}
      </p>{" "}
      <p className="text-sm">
        {event.guestsAccepted > 0 && `${event.guestsAccepted} confirmed, `}{" "}
        {event.guestsDeclined > 0 && `${event.guestsDeclined} not attending, `}{" "}
        {event.guestsPending > 0 && `${event.guestsPending} pending`}
      </p>
      {role === "host" && !event.deletedAt && (
        <CreateInvite eventId={event.id} />
      )}
      <GuestList guests={event.guests} role={role} hostId={event.hostId} />
    </ContentBox>
  );
}
