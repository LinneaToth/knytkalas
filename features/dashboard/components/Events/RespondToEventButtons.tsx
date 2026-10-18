"use client";
import { useState, useTransition } from "react";
import { UserMinus, UserPlus } from "lucide-react";
import Button from "@/ui/components/Button";
import { rspv } from "../../services/rspv";

type Props = {
  status: "GOING" | "PENDING" | "DECLINED";
  id?: number;
  totalGuests: number;
};

export default function RespondToEventButtons({
  status = "PENDING",
  id,
  totalGuests = 1,
}: Props) {
  //Hooks must be called before the early return below
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!id) return <></>;

  //One shared transition for all buttons: they are all disabled while any response is being saved, which also stops fast double clicks on add/remove guest
  const respond = (newStatus: "GOING" | "DECLINED", guestChange: number) => {
    startTransition(async () => {
      setError(null);
      const result = await rspv(id, newStatus, guestChange);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <>
      {" "}
      {status === "GOING" && (
        <>
          <h3 className="mt-5">
            {totalGuests === 1
              ? "No extra guests"
              : `You are bringing ${totalGuests - 1} extra guests`}
          </h3>
          <section className="flex flex-row items-stretch gap-3 lg:flex-col 2xl:flex-row">
            {" "}
            {totalGuests > 1 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => respond("GOING", -1)}
                disabled={pending}
              >
                <UserMinus /> Remove guest
              </Button>
            )}
            <Button
              size="sm"
              variant="primary"
              onClick={() => respond("GOING", 1)}
              disabled={pending}
            >
              <UserPlus /> Add guest
            </Button>
          </section>
        </>
      )}
      <h3 className="mt-5 mb-5">
        {status === "PENDING"
          ? "Respond to invitation"
          : "Change your response"}
      </h3>
      {/* Stacked under the other boxes (below lg): same as other button rows. Floating box top right (lg+): full width */}
      <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-center lg:flex-col lg:items-stretch">
        {status !== "GOING" && (
          <Button
            variant="dark"
            onClick={() => respond("GOING", 0)}
            disabled={pending}
            className="w-full md:w-auto lg:w-full"
          >
            I&apos;ll join!
          </Button>
        )}
        {status !== "DECLINED" && (
          <Button
            variant="dark"
            onClick={() => respond("DECLINED", 0)}
            disabled={pending}
            className="w-full md:w-auto lg:w-full"
          >
            Can&apos;t come.
          </Button>
        )}
      </div>
      {error && <p className="text-error">{error}</p>}
    </>
  );
}
