import { useState } from "react";
import ResponseStatus from "../Events/ResponseStatus";
import { uninviteGuest } from "../../services/uninviteGuest";
import { Link, Check } from "lucide-react";
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

  const handleCopy = async (inviteId: number) => {
    const inviteLink = await getInviteLink(inviteId);

    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopiedId(inviteId);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } else {
      alert("Failed to copy invite link. Please try again.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {guests.map((guest) => {
        const isCopied = copiedId === guest.inviteId;

        return (
          <div
            key={"invID" + guest.inviteId}
            className={`bg-card-background mb-2 flex flex-col justify-between gap-5 rounded-2xl border-l-10 p-5 md:flex-row ${
              guest.status === "GOING"
                ? "border-success"
                : guest.status === "PENDING"
                  ? "border-inactive"
                  : "border-error"
            }`}
          >
            <section className="flex flex-row md:flex-col">
              <p>
                {guest.guestName}{" "}
                {guest.totalGuests > 1 && (
                  <>+ {guest.totalGuests - 1} extra guests</>
                )}
              </p>

              {role === "host" && guest.id !== hostId && (
                <button
                  className="ml-5 w-full text-start hover:cursor-pointer md:mt-5 md:ml-0"
                  onClick={() => {
                    if (
                      confirm(
                        `This will uninvite ${guest.guestName} from this event.`,
                      )
                    ) {
                      uninviteGuest(guest.inviteId);
                    }
                  }}
                >
                  <span className="text-secondary font-extrabold">✖</span>{" "}
                  Uninvite
                </button>
              )}
            </section>{" "}
            <section className="flex gap-3">
              {role === "host" && guest.status === "PENDING" && (
                <button
                  className={`text-primary-darkest border-primary-darkest flex h-8 cursor-pointer items-center justify-center rounded-xl border p-3 px-2 py-1 text-center text-xs font-medium shadow-sm transition-all duration-20 ${
                    isCopied
                      ? "border-success bg-success/10 text-success"
                      : "bg-card-background hover:bg-gray-50"
                  }`}
                  onClick={() => handleCopy(guest.inviteId)}
                  disabled={isCopied}
                >
                  {isCopied ? (
                    <>
                      <Check /> Copied!
                    </>
                  ) : (
                    <>
                      <Link /> Copy invite link
                    </>
                  )}
                </button>
              )}

              <ResponseStatus status={guest.status} role={role} />
            </section>
          </div>
        );
      })}
    </div>
  );
}
