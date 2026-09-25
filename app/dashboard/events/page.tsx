import { getUsersEvents } from "@/features/dashboard/services/getUsersEvents";
import EventList from "@/features/dashboard/components/Events/EventList";

export default async function Page() {
  const usersEvents = await getUsersEvents("all");

  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <h1 className="text-h1">My Events </h1>
      </header>

      <section className="col-span-3 col-start-2 row-start-2 w-full scrollbar-none overflow-y-scroll px-5 md:px-10">
        {usersEvents.length > 0 && <EventList events={usersEvents} />}
        {usersEvents.length === 0 &&
          "You currently have no events. You should create one!"}
      </section>
    </>
  );
}
