"use client";

import ContentBox from "@/ui/components/ContentBox";
import PercentageBar from "@/ui/components/PercentageBar";
import GuestList from "./GuestList";
import { getEventDetails } from "../../services/getEventDetails";
import CreateInvite from "../CreateInvite";

type Props = {
  event: Awaited<ReturnType<typeof getEventDetails>>;
  role: "host" | "guest";
};

export default function GuestsDetails({ event, role }: Props) {
  if (!event) return <></>;

  const eventHasBeen = event.date < new Date();

  const guestData = [
    {
      label: "Attending",
      amount: event.guestsAccepted,
      color: "var(--success)",
    },
    {
      label: "Not Attending",
      amount: event.guestsDeclined,
      color: "var(--secondary)",
    },
    { label: "Pending", amount: event.guestsPending, color: "var(--inactive)" },
  ];

  return (
    <ContentBox styling="gap-5 items-center" glass={true}>
      <h2 className="uppercase">Guests</h2>
      <GuestList guests={event.guests} role={role} hostId={event.hostId} />
      <PercentageBar data={guestData} />
      <p>
        Attending: {event.guestsAccepted} /{" "}
        {event.guestsAccepted + event.guestsPending + event.guestsDeclined}
      </p>{" "}
      {role === "host" && !event.deletedAt && !eventHasBeen && (
        <CreateInvite eventId={event.id} />
      )}
    </ContentBox>
  );
}
