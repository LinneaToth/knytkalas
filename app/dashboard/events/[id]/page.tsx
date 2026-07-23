"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import EventDetails from "@/features/dashboard/components/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { getContributionsByEvent } from "@/features/dashboard/services/getContributionsByEvent";
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
        <FeatureHeadline size="large">{event.occasion}</FeatureHeadline>
      </header>
      <div className="col-span-3 col-start-2 row-span-2 row-start-2 grid min-h-0 w-full grid-cols-1 gap-6 overflow-y-auto px-10 md:grid-cols-3">
        <section className="flex min-h-0 flex-col gap-5 md:col-span-2 md:col-start-1 md:row-start-1 md:-row-end-1">
          <GuestDetails role={role} event={event} />
          <ContributionsDetails contributions={contributions} />
        </section>
        <section className="flex flex-col gap-5 md:col-span-1 md:col-start-3 md:row-start-1 md:-row-end-1">
          <EventDetails
            event={event}
            date={event.date.toLocaleDateString()}
            time={event.date.toLocaleTimeString().slice(0, -3)}
            role={role}
          />{" "}
          <ResponseDetails role={role} event={event} />
        </section>
      </div>
    </>
  );
}
