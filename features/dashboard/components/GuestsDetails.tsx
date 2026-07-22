import ContentBox from "@/ui/components/ContentBox";
import PercentageBar from "@/ui/components/PercentageBar";
import GuestList from "./GuestList";

type Props = {
  guestsAccepted: number;
  guestsPending: number;
  guestsDeclined: number;
  guests: {
    id: string | null;
    guestName: string;
    status: string;
    totalGuests: number;
  }[];
};

export default function GuestDetails({
  guestsAccepted,
  guestsPending,
  guestsDeclined,
  guests,
}: Props) {
  const guestData = [
    { label: "Attending", amount: guestsAccepted, color: "var(--success)" },
    { label: "Not Attending", amount: guestsDeclined, color: "var(--accent)" },
    { label: "Pending", amount: guestsPending, color: "var(--primary)" },
  ];

  return (
    <ContentBox styling="md:col-span-1 md:col-start-3 gap-2">
      <h2>Guests</h2> <PercentageBar data={guestData} />
      <p>
        Attending: {guestsAccepted} /{" "}
        {guestsAccepted + guestsPending + guestsDeclined}
      </p>{" "}
      <p className="text-sm">
        {guestsAccepted > 0 && `${guestsAccepted} confirmed, `}{" "}
        {guestsDeclined > 0 && `${guestsDeclined} not attending, `}{" "}
        {guestsPending > 0 && `${guestsPending} pending`}
      </p>
      <GuestList guests={guests} />
    </ContentBox>
  );
}
