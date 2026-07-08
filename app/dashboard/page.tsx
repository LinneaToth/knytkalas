import { Event as PrismaEvent } from "@/generated/prisma";
import EventList from "@/features/dashboard/components/EventList";
import DashboardMenu from "@/features/dashboard/components/DashboardMenu";
import FeatureHeadline from "@/components/ui/FeatureHeadline";
import HostEventCta from "@/features/dashboard/components/HostEventCta";

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
  },
];

const hostMockEvents: PrismaEvent[] = [
  {
    id: 101,
    createdAt: new Date(),
    occasion: "Brunch mot söndagsångest",
    description:
      "Vem orkar måndag? Vi dränker måndagsångesten i mimosa, pannkakor och alldeles för mycket lönnsirap.",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-10-04T11:00:00"),
    location: "Café Mys, Götgatan",
    responseDeadline: new Date("2026-10-02"),
    hostId: "host-brunch-789",
  },
  {
    id: 102,
    createdAt: new Date(),
    occasion: "Spelkväll",
    description:
      "Vänskaper kommer att sättas på prov i Monopoly och Settlers. Förloraren diskar.",
    activeCategories: ["MAIN", "SALAD", "DESSERT"],
    date: new Date("2026-11-14T18:00:00"),
    location: "Hemma hos Linus, Lgh 4B",
    responseDeadline: new Date("2026-11-12"),
    hostId: "host-gamer-999",
  },
];

export default function Dashboard() {
  return (
    <div className="grid h-full max-w-350 grid-cols-4 grid-rows-[auto_1fr]">
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>My Events </FeatureHeadline>
      </header>
      <section className="col-span-1 col-start-1 row-span-2 row-start-1">
        <DashboardMenu />
      </section>
      <section className="col-span-1 col-start-2 row-start-2 px-10">
        <h2 className="mb-5">Attending</h2>
        <EventList events={mockEvents} />
      </section>
      <section className="col-span-1 col-start-3 row-start-2 pr-10">
        <h2 className="mb-5">Hosting</h2>
        <EventList events={hostMockEvents} />
      </section>
      <section className="col-span-1 col-start-4 row-start-2 pr-10">
        <HostEventCta />
      </section>
    </div>
  );
}
