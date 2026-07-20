"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import EventDetails from "@/features/dashboard/components/EventDetails";
import { getEventDetails } from "@/features/dashboard/services/getEventDetails";

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

  return (
    <EventDetails
      event={event}
      date={event.date.toLocaleDateString()}
      time={event.date.toLocaleTimeString().slice(0, -3)}
      role={userId === event.hostId ? "host" : "guest"}
    />
  );
}
