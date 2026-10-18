"use server";

import { notFound } from "next/navigation";

import EventDetails from "@/features/dashboard/components/Events/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";
import { getContributionsByEvent } from "@/features/dashboard/services/getContributionsByEvent";
import ResponseDetails from "@/features/dashboard/components/Events/ResponseDetails";
import GuestDetails from "@/features/dashboard/components/Guests/GuestsDetails";
import ContributionsDetails from "@/features/dashboard/components/Contributions/ContributionsDetails";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) return notFound(); //404 if id is not a valid int, no lookups needed
  const event = await getEventDetails(eventId);
  if (!event) return notFound(); //404 if event not found or user not authorized to see it
  const user = await getCurrentUser();
  if (!user) throw new Error("No session found"); //getEventDetails already throws without a session, and proxy.ts requires one in /dashboard. Getting here without a user means something is broken

  //getEventDetails already found the user's own invite. Both guests and the host have one (createEvent creates the host's invite)
  const usersInviteId = event.userInviteId;
  if (!usersInviteId) throw new Error("User has no invite for this event"); //getEventDetails only returns events the user is invited to or hosts, so a missing invite means broken data

  const contributions = await getContributionsByEvent(event.id);
  const role = user.id === event.hostId ? "host" : "guest";
  const userAvoids = user.onboarded ? user.avoids : [];
  const eventHasBeen = event.date < new Date();

  //Time right now only works in Sweden. If locale feature later is introduced; time coversion must be implemented.
  return (
    <>
      <header className="p-10">
        {" "}
        <h1 className="text-h1">{event.occasion}</h1>
      </header>
      <div className="grid min-h-0 w-full grid-cols-1 gap-6 overflow-y-auto px-5 md:grid-cols-3 md:px-10">
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
            eventHasBeen={eventHasBeen}
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
