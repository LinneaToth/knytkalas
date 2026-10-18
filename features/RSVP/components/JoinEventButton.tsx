"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import { claimInvite } from "../services/claimInvite";

type Props = {
  token: string;
  eventId: number;
};

export default function JoinEventButton({ token, eventId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition(); //pending is true while the action is running
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      //Wrapping the action in a transition makes thrown errors reach the nearest error boundary, and also allows us to show a loading state while the action is running. "expected" errors are stored in the error state
      setError(null);
      const claimedInviteResult = await claimInvite(token);
      if (claimedInviteResult?.error) {
        setError(claimedInviteResult.error);
        return;
      }
      router.push(`/dashboard/events/${eventId}/`);
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleClick} disabled={pending}>
        {pending ? "Joining..." : "Join this event"}
      </Button>
      {error && <p className="text-error">{error}</p>}
    </>
  );
}
