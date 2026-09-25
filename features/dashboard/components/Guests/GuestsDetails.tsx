"use client";

import { useState } from "react";
import ContentBox from "@/ui/components/ContentBox";
import PercentageBar from "@/ui/components/PercentageBar";
import GuestList from "./GuestList";
import { getEventDetails } from "../../services/getEventDetails";
import CreateInvite from "../CreateInvite";
import { ChevronUp, ChevronDown } from "lucide-react";

type Props = {
  event: Awaited<ReturnType<typeof getEventDetails>>;
  role: "host" | "guest";
};

export default function GuestsDetails({ event, role }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

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
    <ContentBox styling="gap-8" glass={true}>
      <header className="flex items-center justify-between">
        <h2 className="uppercase">Guest list</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex transition-transform duration-200 hover:cursor-pointer"
        >
          {isExpanded ? (
            <>
              Hide <ChevronUp />
            </>
          ) : (
            <>
              Show <ChevronDown />
            </>
          )}
        </button>
      </header>

      <div
        className={`grid transition-all duration-150 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8 overflow-hidden">
          <GuestList guests={event.guests} role={role} hostId={event.hostId} />
          <PercentageBar data={guestData} />
          <p>
            Attending: {event.guestsAccepted} /{" "}
            {event.guestsAccepted + event.guestsPending + event.guestsDeclined}
          </p>{" "}
          {role === "host" && !event.deletedAt && !eventHasBeen && (
            <CreateInvite eventId={event.id} />
          )}
        </div>
      </div>
    </ContentBox>
  );
}
