import { Event as PrismaEvent } from "@/generated/prisma";
import EventList from "@/features/dashboard/components/EventList";
import DashboardMenu from "@/features/dashboard/components/DashboardMenu";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import HostEventCta from "@/features/dashboard/components/HostEventCta";
import { getHostedEvents } from "@/features/dashboard/services/getHostedEvents";

const mockEvents: PrismaEvent[] = [
  {
    id: 1,
    createdAt: new Date(),
    occasion: "Julafton",
    description: "Casual dinner, bring a dish!",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-12-24T19:00:00"),
    location: "123 Maple St",
    responseDeadline: new Date("2026-08-10"),
    hostId: "some-cuid-string",
    deletedAt: new Date(),
  },
  {
    id: 2354,
    createdAt: new Date(),
    occasion: "Något annat",
    description: "Casual dinner, bring a dish!",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-12-24T19:00:00"),
    location: "123 Maple St",
    responseDeadline: new Date("2026-08-10"),
    hostId: "some-cuid-string",
    deletedAt: null,
  },
  {
    id: 3,
    createdAt: new Date(),
    occasion: "Midsommar",
    description:
      "Vi binder kransar, reser stången och äter tills vi skäms. Ta med egen snaps!",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-06-19T13:00:00"),
    location: "Ängsvägen 7, Skärgården",
    responseDeadline: new Date("2026-06-01"),
    hostId: "host-midsommar-123",
    deletedAt: null,
  },
  {
    id: 4,
    createdAt: new Date(),
    occasion: "Nördkväll",
    description:
      "Vi debuggar bort våra livskriser och bygger något episkt. Kod, koffein och tjockpizza ingår.",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-09-12T17:30:00"),
    location: "TechHub, Studio 4",
    responseDeadline: new Date("2026-09-05"),
    hostId: "host-coder-456",
    deletedAt: null,
  },
];

export default async function Dashboard() {
  const hostedEvents = await getHostedEvents();

  return (
    <div className="grid h-full max-w-350 grid-cols-4 grid-rows-[auto_1fr]">
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>My Events </FeatureHeadline>
      </header>
      <section className="col-span-1 col-start-1 row-span-2 row-start-1">
        <DashboardMenu />
      </section>
      <section className="col-span-1 col-start-2 row-start-2 px-10">
        <h2 className="mb-5">Invited</h2>
        <EventList events={mockEvents} />
      </section>
      <section className="col-span-1 col-start-3 row-start-2 pr-10">
        <h2 className="mb-5">Hosting</h2>
        <EventList events={hostedEvents} />
      </section>
      <section className="col-span-1 col-start-4 row-start-2 pr-10">
        <HostEventCta />
      </section>
    </div>
  );
}
