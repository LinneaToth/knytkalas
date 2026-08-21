"use server";

import EventDetails from "@/features/dashboard/components/Events/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";
import { getContributionsByEvent } from "@/features/dashboard/services/getContributionsByEvent";
import ResponseDetails from "@/features/dashboard/components/Events/ResponseDetails";
import GuestDetails from "@/features/dashboard/components/Guests/GuestsDetails";
import ContributionsDetails from "@/features/dashboard/components/Contributions/ContributionsDetails";
import { getInviteIdByUserAndEvent } from "@/features/dashboard/services/getInviteIdByUserAndEvent";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventDetails(Number(id));
  if (!event) return <h2>Event not found</h2>;
  const user = await getCurrentUser();
  if (!user) return <h2>User not signed in</h2>; //SHOULD BE REPLACED WITH A REDIRECT TO SOMETHING THAT PROMPTS USER TO SIGN IN

  const contributions = await getContributionsByEvent(event.id);
  const role = user.id === event.hostId ? "host" : "guest";
  const usersInviteId = await getInviteIdByUserAndEvent(user.id, event.id);
  const userAvoids = user.onboarded ? user.avoids : [];

  //Time right now only works in Sweden. If locale feature later is introduced; time coversion must be implemented.
  return (
    <>
      <header className="p-10">
        {" "}
        <h1 className="text-4xl">{event.occasion}</h1>
      </header>
      <div className="grid min-h-0 w-full grid-cols-1 gap-6 overflow-y-auto px-10 md:grid-cols-3">
        <section className="col-span-3 flex min-h-0 flex-col gap-5 md:col-start-1 md:row-start-1 lg:col-span-2">
          <EventDetails
            event={event}
            date={event.date.toLocaleDateString("sv-SE")}
            time={event.date.toLocaleTimeString("sv-SE").slice(0, -3)}
            role={role}
          />{" "}
          <div className="lg:hidden">
            <ResponseDetails role={role} event={event} />
          </div>
          <ContributionsDetails
            contributions={contributions}
            inviteId={usersInviteId}
            avoids={userAvoids}
          />
          <GuestDetails role={role} event={event} />
        </section>
        <section className="hidden flex-col gap-5 md:-row-end-1 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:flex">
          {" "}
          <ResponseDetails role={role} event={event} />
        </section>
      </div>
    </>
  );
}
