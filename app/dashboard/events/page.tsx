import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { getUsersEvents } from "@/features/dashboard/services/getUsersEvents";
import EventList from "@/features/dashboard/components/EventList";
import HostEventCta from "@/features/dashboard/components/CreateEvent";

export default async function Page() {
  const usersInvitedEvents = await getUsersEvents("guest");
  const usersHostedEvents = await getUsersEvents("host");

  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>My Events </FeatureHeadline>
      </header>

      <section className="col-span-1 col-start-2 row-start-2 px-10">
        <h2 className="mb-5">Invited</h2>
        <EventList events={usersInvitedEvents} />
      </section>
      <section className="col-span-1 col-start-3 row-start-2 pr-10">
        <h2 className="mb-5">Hosting</h2>
        <EventList events={usersHostedEvents} />
      </section>
      <section className="col-span-1 col-start-4 row-start-2 pr-10">
        <h2>Create Event</h2>
        <HostEventCta />
      </section>
    </>
  );
}
