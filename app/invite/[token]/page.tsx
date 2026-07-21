"use server";
import { getInviteByToken } from "@/data/dal/invite/getInviteByToken";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getUser } from "@/data/dal/user/getUser";
import Link from "next/link";
import { claimInvite } from "@/features/RSVP/services/claimInvite";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = await getInviteByToken(token);
  if (!invite) return <h2>Invite not found</h2>;
  const event = invite.event;
  if (!event) return <h2>Event not found</h2>;
  const currentUser = await getCurrentUserId();

  if (currentUser && !invite.guestId && currentUser !== invite.invById) {
    await claimInvite(currentUser, invite);
  }

  if (invite.guestId) return <h1>This invite has already been claimed!</h1>;

  const host = await getUser(invite.invById);

  return (
    <div>
      <h1>YOU ARE INVITED TO {event.occasion}!</h1>
      <p>Event Date: {event.date.toDateString()}</p>
      <p>Start time: {event.date.toLocaleTimeString().slice(0, -3)}</p>
      <p>Location: {event.location}</p>
      <p>Event Description: {event.description}</p>

      <div>
        Let {host ? host.name : "the host"} know if you can make it!{" "}
        {!currentUser && (
          <nav>
            <Link href={`/onboarding?target-url=invite/${token}/`}>
              New user? Please sign up to join the event!
            </Link>

            <Link href={`/login?target-url=/invite/${token}/`}>
              Returning user? Welcome back! Please sign in to join this event!
            </Link>
          </nav>
        )}
        {currentUser && (
          <Link href={`/dashboard/events/${event.id}/`}>
            Welcome back! Click here to access the event page!{" "}
          </Link>
        )}
      </div>
    </div>
  );
}
