"use client";
import { UserMinus, UserPlus } from "lucide-react";
import Button from "@/ui/components/Button";
import { rspv } from "../services/rspv";

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
  if (!id) return <></>;
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
          <section className="flex items-center gap-3">
            {" "}
            {totalGuests > 1 && (
              <Button
                size="s"
                variant="ghost"
                onClick={() => rspv(id, "GOING", -1)}
              >
                <UserMinus /> Remove guest
              </Button>
            )}
            <Button
              size="s"
              variant="ghost"
              onClick={() => rspv(id, "GOING", 1)}
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
      {status !== "GOING" && (
        <Button variant="dark" onClick={() => rspv(id, "GOING", 0)}>
          I&apos;ll join!
        </Button>
      )}
      {status !== "DECLINED" && (
        <Button variant="dark" onClick={() => rspv(id, "DECLINED", 0)}>
          Can&apos;t come.
        </Button>
      )}
    </>
  );
}
