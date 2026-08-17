"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import { claimInvite } from "../services/claimInvite";

type Props = {
  token: string;
  eventId: number;
};

export default function JoinEventButton({ token, eventId }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setPending(true);
    setError(null);
    try {
      await claimInvite(token);
      router.push(`/dashboard/events/${eventId}/`);
    } catch (e) {
      setError((e as Error).message);
      setPending(false);
    }
  };

  return (
    <>
      <Button variant="cta" onClick={handleClick} disabled={pending}>
        {pending ? "Joining..." : "Join this event"}
      </Button>
      {error && <p className="text-error">{error}</p>}
    </>
  );
}
