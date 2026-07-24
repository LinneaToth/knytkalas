"use client";

import Button from "@/ui/components/Button";
import { useState, useRef, useEffect } from "react";
import { ListChevronsUpDown, Users } from "lucide-react";
import { uninviteGuest } from "../services/uninviteGuest";

type Props = {
  guests: {
    id: string | null;
    guestName: string;
    status: string;
    totalGuests: number;
    inviteId: number;
  }[];
  role: "host" | "guest";
  hostId: string;
};

export default function GuestList({ guests, role, hostId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isExpanded]);

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
          <div key={"invID" + guest.inviteId} className="mb-2" ref={listRef}>
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
            {role === "host" && guest.id !== hostId && (
              <button onClick={() => uninviteGuest(guest.inviteId)}>
                Remove from guest list
              </button>
            )}
          </div>
        ))}
    </>
  );
}
