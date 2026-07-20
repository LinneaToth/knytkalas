"use client";

import { Contribution } from "@/generated/prisma";
import Button from "@/ui/components/Button";
import { useState } from "react";

export default function GuestList({
  guests,
}: {
  guests: {
    id: string | null;
    guestName: string;
    status: string;
    contributions: Contribution[];
    totalGuests: number;
  }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <h3>Guests:</h3>
      <p>
        {guests.reduce((total, guest) => total + guest.totalGuests, 0)} guests
        are invited to this event.
      </p>{" "}
      <p>
        {" "}
        So far,{" "}
        {guests.reduce(
          (total, guest) =>
            total + (guest.status === "GOING" ? guest.totalGuests : 0),
          0,
        )}{" "}
        guests have confirmed that they are attending!
      </p>
      {isExpanded &&
        guests.map((guest) => (
          <div key={guest.id ?? guest.guestName} className="mb-2">
            <p>{guest.guestName}</p>
            <p>Status: {guest.status}</p>
            <p>
              Contributions: {guest.contributions.map((c) => c.name).join(", ")}
            </p>
          </div>
        ))}
      <Button width="full" onClick={() => setIsExpanded((old) => !old)}>
        {isExpanded ? "Hide guest list" : "Show guest list"}
      </Button>
    </>
  );
}
