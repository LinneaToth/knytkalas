import ContentBox from "@/ui/components/ContentBox";
import { getEventDetails } from "../../services/getEventDetails";
import RespondToEventButtons from "./RespondToEventButtons";

type Props = {
  role: "host" | "guest";
  event: Awaited<ReturnType<typeof getEventDetails>>;
};

export default function ResponseDetails({ role, event }: Props) {
  if (!event) return <ContentBox styling="gap-3">Data missing</ContentBox>;
  const eventHasBeen = event.date < new Date();

  const statusMessage = (() => {
    switch (event.status) {
      case "GOING":
        return eventHasBeen
          ? "you went"
          : "you have confirmed that you are going";
      case "PENDING":
        return eventHasBeen
          ? "you didn't respond to the invitation"
          : "your response is pending";
      case "DECLINED":
        return eventHasBeen
          ? "you didn't go."
          : "you aren't going to this event";
    }
  })();

  return (
    <ContentBox styling="gap-3" glass={true}>
      <h2 className="uppercase">Status</h2>
      <p>
        {role === "host"
          ? `You ${eventHasBeen ? "were" : "are"} arranging this event and ${statusMessage}`
          : `You ${eventHasBeen ? "were" : "are"} on the guest list and ${statusMessage}`}
      </p>

      {!eventHasBeen && (
        <RespondToEventButtons
          status={event.status || "PENDING"}
          id={event.userInviteId}
          totalGuests={event.userInviteGuests || 1}
        />
      )}
    </ContentBox>
  );
}
