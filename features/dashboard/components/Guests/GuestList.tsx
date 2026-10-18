"use client";

import { useState, useTransition } from "react";
import ResponseStatus from "../Events/ResponseStatus";
import { uninviteGuest } from "../../services/uninviteGuest";
import { Link, Check, X } from "lucide-react";
import { getInviteLink } from "../../services/getInviteLink";
import type { IssueType } from "@/generated/prisma";
import IssuePills from "../Contributions/IssuePills";

type Props = {
  guests: {
    id: string | null;
    guestName: string;
    status: "GOING" | "PENDING" | "DECLINED";
    totalGuests: number;
    inviteId: number;
    allergies: IssueType[];
  }[];
  role: "host" | "guest";
  hostId: string;
};

export default function GuestList({ guests, role, hostId }: Props) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition(); //Shared for the whole list, only one uninvite at a time

  const handleUninvite = (inviteId: number, guestName: string) => {
    if (!confirm(`This will uninvite ${guestName} from this event.`)) return;

    //confirm() stays outside the transition, so pending only covers the server call.
    //Thrown errors reach the nearest error boundary, expected ones are stored in the error state. No router.refresh() needed, uninviteGuest calls revalidatePath
    startTransition(async () => {
      setError(null);
      const result = await uninviteGuest(inviteId);
      if (result?.error) setError(result.error);
    });
  };

  const [isCopying, startCopyTransition] = useTransition(); //Separate from uninvite, so copying doesn't disable the uninvite buttons

  const handleCopy = (inviteId: number) => {
    startCopyTransition(async () => {
      setError(null);
      const result = await getInviteLink(inviteId);
      //"in" narrows the type: after this, TypeScript knows result is { link }
      if ("error" in result) {
        setError(result.error);
        return;
      }

      //A targeted try/catch is right here: the clipboard can be refused by the browser (permissions, no https), and that is something we can actually handle by showing the link instead
      try {
        await navigator.clipboard.writeText(result.link);
      } catch {
        setError(`Couldn't copy the link, copy it manually: ${result.link}`);
        return;
      }

      setCopiedId(inviteId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {error && <p className="text-error">{error}</p>}
      {guests.map((guest) => {
        const isCopied = copiedId === guest.inviteId;

        //Card grid: name | status on mobile with the copy link below the name, name | copy link | status from sm. Allergies span the full bottom row
        return (
          <div
            key={"invID" + guest.inviteId}
            className={`bg-card-background/60 mb-2 grid grid-cols-[1fr_auto] items-start gap-3 rounded-2xl border-1 p-5 sm:grid-cols-[1fr_auto_auto] ${
              guest.status === "GOING"
                ? "border-success"
                : guest.status === "PENDING"
                  ? "border-inactive"
                  : "border-error"
            }`}
          >
            <section className="col-start-1 row-start-1 flex flex-col">
              <div className="flex flex-row items-center justify-start gap-2">
                <p className="">
                  {guest.guestName}{" "}
                  {guest.totalGuests > 1 && (
                    <>+ {guest.totalGuests - 1} extra </>
                  )}
                </p>{" "}
                {role === "host" && guest.id !== hostId && (
                  <button
                    className="text-secondary flex h-8 cursor-pointer items-center justify-center rounded-xl text-center text-xs font-medium transition-all duration-20 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() =>
                      handleUninvite(guest.inviteId, guest.guestName)
                    }
                    disabled={pending}
                  >
                    <X size="20" />
                  </button>
                )}
              </div>
            </section>
            {/* Explicit placement: the button comes before the status in the code but sits below it on mobile */}
            {role === "host" && guest.status === "PENDING" && (
              <div className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">
                <button
                  className={`text-primary-darkest border-primary-darkest flex h-fit cursor-pointer items-center justify-center rounded-xl border p-3 px-2 py-1 text-center text-xs text-[11px] font-medium shadow-sm transition-all duration-20 ${
                    isCopied
                      ? "border-success bg-success/10 text-success"
                      : "bg-card-background hover:bg-gray-50"
                  }`}
                  onClick={() => handleCopy(guest.inviteId)}
                  disabled={isCopied || isCopying}
                >
                  {isCopied ? (
                    <>
                      <Check size="12" /> Copied!
                    </>
                  ) : (
                    <>
                      <Link size="12" /> Copy invite link
                    </>
                  )}
                </button>
              </div>
            )}
            <div className="col-start-2 row-start-1 sm:col-start-3">
              <ResponseStatus status={guest.status} />
            </div>
            {guest.allergies.length > 0 && (
              <div className="col-span-full">
                <IssuePills
                  alertIssues={guest.allergies}
                  otherIssues={[]}
                  justify="start"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
