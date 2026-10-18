"use client";

import { useState, useTransition } from "react";
import ResponseStatus from "../Events/ResponseStatus";
import { uninviteGuest } from "../../services/uninviteGuest";
import { Link, Check, X } from "lucide-react";
import { getInviteLink } from "../../services/getInviteLink";

type Props = {
  guests: {
    id: string | null;
    guestName: string;
    status: "GOING" | "PENDING" | "DECLINED";
    totalGuests: number;
    inviteId: number;
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

        return (
          <div
            key={"invID" + guest.inviteId}
            className={`bg-card-background/60 relative mb-2 flex flex-col gap-5 rounded-2xl border-1 p-5 ${
              guest.status === "GOING"
                ? "border-success"
                : guest.status === "PENDING"
                  ? "border-inactive"
                  : "border-error"
            }`}
          >
            <section className="flex flex-col">
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
            </section>{" "}
            <section className="absolute top-5 right-5 flex flex-row items-start gap-3">
              <div className="flex w-full flex-wrap items-center gap-3">
                {role === "host" && guest.status === "PENDING" && (
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
                )}
              </div>
              <ResponseStatus status={guest.status} />
            </section>
          </div>
        );
      })}
    </div>
  );
}
