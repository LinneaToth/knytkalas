"use client";

import { Contribution } from "@/generated/prisma";
import Button from "@/ui/components/Button";
import { useState } from "react";
import { ListChevronsUpDown, Users } from "lucide-react";

export default function GuestList({
  guests,
}: {
  guests: {
    id: string | null;
    guestName: string;
    status: string;
    totalGuests: number;
  }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Button width="full" onClick={() => setIsExpanded((old) => !old)}>
        {isExpanded ? (
          "Hide guest list"
        ) : (
          <>
            <ListChevronsUpDown /> Show guest list
          </>
        )}
      </Button>

      {isExpanded &&
        guests.map((guest) => (
          <div key={guest.id ?? guest.guestName} className="mb-2">
            <p className="flex">
              {guest.guestName}{" "}
              {guest.totalGuests > 1 && (
                <>
                  + {guest.totalGuests - 1}
                  <Users />
                </>
              )}
            </p>
            <p>Status: {guest.status}</p>
          </div>
        ))}
    </>
  );
}
