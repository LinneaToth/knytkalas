import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { getUsersEvents } from "@/features/dashboard/services/getUsersEvents";
import EventList from "@/features/dashboard/components/EventList";

export default async function Page() {
  const usersEvents = await getUsersEvents("all");

  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>My Events </FeatureHeadline>
      </header>

      <section className="col-span-3 col-start-2 row-start-2 px-10">
        {usersEvents.length > 0 && <EventList events={usersEvents} />}
        {usersEvents.length === 0 && "You currently have no events!"}
      </section>
    </>
  );
}
