"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import EventDetails from "@/features/dashboard/components/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import GuestList from "@/features/dashboard/components/GuestList";
import { getContributionsByEvent } from "@/features/dashboard/services/getContributionsByEvent";
import ContributionsList from "@/features/dashboard/components/ContributionsList";

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

  return (
    <>
      {" "}
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>{event.occasion}</FeatureHeadline>
      </header>
      <section className="col-span-1 col-start-2 row-start-2 px-10">
        <EventDetails
          event={event}
          date={event.date.toLocaleDateString()}
          time={event.date.toLocaleTimeString().slice(0, -3)}
          role={userId === event.hostId ? "host" : "guest"}
        />
      </section>
      <section className="col-span-1 col-start-3 row-start-2 px-10">
        {" "}
        <GuestList guests={event.guests} />
      </section>
      <section className="col-span-1 col-start-4 row-start-2 px-10">
        {" "}
        <ContributionsList contributions={contributions} />
      </section>
    </>
  );
}
