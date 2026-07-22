"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import EventDetails from "@/features/dashboard/components/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import GuestList from "@/features/dashboard/components/GuestList";
import { getContributionsByEvent } from "@/features/dashboard/services/getContributionsByEvent";
import ContributionsList from "@/features/dashboard/components/ContributionsList";
import ResponseDetails from "@/features/dashboard/components/ResponseDetails";
import GuestDetails from "@/features/dashboard/components/GuestsDetails";
import ContributionsDetails from "@/features/dashboard/components/ContributionsDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventDetails(Number(id));
  if (!event) return <h2>Event not found</h2>;
  const userId = await getCurrentUserId();
  if (!userId) return <h2>User not signed in</h2>; //SHOULD BE REPLACED WITH A REDIRECT TO SOMETHING THAT PROMPTS USER TO SIGN IN

  const contributions = await getContributionsByEvent(event.id);
  const role = userId === event.hostId ? "host" : "guest";

  return (
    <>
      <header className="col-span-3 col-start-2 row-span-1 p-10">
        {" "}
        <FeatureHeadline size="medium">{event.occasion}</FeatureHeadline>
      </header>
      <main className="col-span-3 col-start-2 row-span-2 row-start-2 grid grid-cols-1 items-start gap-6 px-10 md:grid-cols-3">
        <section className="flex flex-col gap-5 md:col-span-2 md:col-start-1 md:row-start-1 md:-row-end-1">
          <EventDetails
            event={event}
            date={event.date.toLocaleDateString()}
            time={event.date.toLocaleTimeString().slice(0, -3)}
            role={role}
          />
          <ContributionsDetails contributions={contributions} />
        </section>
        <section className="flex flex-col gap-5 md:col-span-1 md:col-start-3 md:row-start-1 md:-row-end-1">
          <ResponseDetails />
          <GuestDetails
            guestsAccepted={event.guestsAccepted}
            guestsPending={event.guestsPending}
            guestsDeclined={event.guestsDeclined}
            guests={event.guests}
          />
        </section>
      </main>
    </>
  );
}
