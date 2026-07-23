"use client";

import Button from "@/ui/components/Button";
import { rspv } from "../services/rspv";

type Props = {
  status: "GOING" | "PENDING" | "DECLINED";
  id?: number;
  eventId: number;
  totalGuests: number;
};

export default function RespondToEventButtons({
  status = "PENDING",
  id,
  totalGuests,
}: Props) {
  if (!id) return <></>;
  return (
    <>
      {" "}
      {status === "GOING" && (
        <>
          <h3>
            {totalGuests === 1
              ? "No extra guests"
              : `I'm bringing ${totalGuests - 1} extra guests`}
          </h3>
          <Button onClick={() => rspv(id, "GOING", 1)}>Add guest</Button>
          {totalGuests > 1 && (
            <Button onClick={() => rspv(id, "GOING", -1)}>Remove guest</Button>
          )}
        </>
      )}
      <h3>
        {status === "PENDING"
          ? "Respond to invitation"
          : "Change your response"}
      </h3>
      {status !== "GOING" && (
        <Button onClick={() => rspv(id, "GOING", 0)}>I&apos;ll join!</Button>
      )}
      {status !== "DECLINED" && (
        <Button onClick={() => rspv(id, "DECLINED", 0)}>
          Can&apos;t come.
        </Button>
      )}
    </>
  );
}
