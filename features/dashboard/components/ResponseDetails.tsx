import Button from "@/ui/components/Button";
import ContentBox from "@/ui/components/ContentBox";
import { getEventDetails } from "../services/getEventDetails";
import RespondToEventButtons from "./RespondToEventButtons";

type Props = {
  role: "host" | "guest";
  event: Awaited<ReturnType<typeof getEventDetails>>;
};

export default function ResponseDetails({ role, event }: Props) {
  if (!event) return <ContentBox styling="gap-3">Data missing</ContentBox>;

  const statusMessage = (() => {
    switch (event.status) {
      case "GOING":
        return "You have confirmed that you are going.";
      case "PENDING":
        return "Your response is pending.";
      case "DECLINED":
        return "You aren't going to this event.";
    }
  })();

  return (
    <ContentBox styling="gap-3">
      <h2>Status</h2>
      <p>
        {role === "host"
          ? "You are arranging this event!"
          : "You are on the guest list!"}
      </p>
      <p>{statusMessage}</p>

      <RespondToEventButtons
        status={event.status || "PENDING"}
        id={event.userInviteId}
        eventId={event.id}
        totalGuests={event.userInviteGuests}
      />
    </ContentBox>
  );
}
