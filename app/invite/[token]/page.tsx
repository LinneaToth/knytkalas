"use server";
import { getInviteByToken } from "@/data/dal/invite/getInviteByToken";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getUser } from "@/data/dal/user/getUser";
import JoinEventButton from "@/features/RSVP/components/JoinEventButton";
import NavBar from "@/features/pageFrame/components/NavBar";
import ContentBox from "@/ui/components/ContentBox";
import Button from "@/ui/components/Button";
import { CalendarDays, Clock10, MapPin } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = await getInviteByToken(token);

  if (!invite) {
    return (
      <>
        <NavBar mode="onboarding" />
        <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
          <ContentBox
            styling="gap-5 text-center bg-opacity-30 backdrop-blur-lg p-10"
            glass={true}
          >
            <h1 className="text-4xl">Invite not found</h1>
          </ContentBox>
        </main>
      </>
    );
  }

  const event = invite.event;

  if (!event) {
    return (
      <>
        <NavBar mode="onboarding" />
        <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
          <ContentBox
            styling="gap-5 text-center bg-opacity-30 backdrop-blur-lg p-10"
            glass={true}
          >
            <h1 className="text-4xl">Event not found</h1>
          </ContentBox>
        </main>
      </>
    );
  }

  const currentUser = await getCurrentUserId();
  const isHost = currentUser === invite.invById;

  if (invite.guestId) {
    return (
      <>
        <NavBar mode={currentUser ? "signedin" : "onboarding"} />
        <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
          <ContentBox
            styling="gap-5 text-center bg-opacity-30 backdrop-blur-lg p-10"
            glass={true}
          >
            <h1 className="text-4xl">
              {isHost
                ? `This invite was claimed by ${invite.guestName}!`
                : "This invite has already been claimed!"}
            </h1>
            {isHost && (
              <Button variant="cta" href={`/dashboard/events/${event.id}/`}>
                Back to event
              </Button>
            )}
          </ContentBox>
        </main>
      </>
    );
  }

  const host = await getUser(invite.invById);

  return (
    <>
      <NavBar mode={currentUser ? "signedin" : "onboarding"} />
      <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
        <ContentBox
          styling="gap-5 text-left bg-opacity-30 backdrop-blur-lg p-10"
          glass={true}
        >
          <h1 className="text-4xl">
            {isHost
              ? `This invite is for ${invite.guestName}`
              : `You are invited to ${event.occasion}`}
          </h1>

          <p className="flex gap-3">
            <CalendarDays />
            {event.date.toDateString()}
          </p>
          <p className="flex gap-3">
            <Clock10 />
            Start time:{" "}
            {event.date.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <p className="flex gap-3">
            <MapPin />
            {event.location ? event.location : "Location to be decided"}
          </p>
          {event.description && <p>{event.description}</p>}

          {isHost && (
            <p>
              Share this link with them so they can RSVP to {event.occasion}.
            </p>
          )}
          {!isHost && (
            <p>Let {host ? host.name : "the host"} know if you can make it!</p>
          )}

          {isHost && (
            <Button variant="cta" href={`/dashboard/events/${event.id}/`}>
              Back to event
            </Button>
          )}
          {!isHost && !currentUser && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/onboarding?target-url=invite/${token}/`}>
                New user? Sign up to join the event!
              </Button>
              <Button
                variant="outline"
                href={`/login?target-url=/invite/${token}/`}
              >
                Returning user? Sign in to join this event!
              </Button>
            </div>
          )}
          {!isHost && currentUser && (
            <JoinEventButton token={token} eventId={event.id} />
          )}
        </ContentBox>
      </main>
    </>
  );
}
