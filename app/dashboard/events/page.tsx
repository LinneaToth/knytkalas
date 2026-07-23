import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { getUsersEvents } from "@/features/dashboard/services/getUsersEvents";
import EventList from "@/features/dashboard/components/EventList";
import { redirect } from "next/navigation";

export default async function Page() {
  const usersEvents = await getUsersEvents("all");

  if (usersEvents.length === 1)
    redirect(`/dashboard/events/${usersEvents[0].id}`);

  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline size="large">My Events </FeatureHeadline>
      </header>

      <section className="col-span-3 col-start-2 row-start-2 w-full scrollbar-none overflow-y-scroll px-10">
        {usersEvents.length > 0 && <EventList events={usersEvents} />}
        {usersEvents.length === 0 && "You currently have no events!"}
      </section>
    </>
  );
}
