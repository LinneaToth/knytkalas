import DashboardMenu from "@/features/dashboard/components/DashboardMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-full max-w-350 grid-cols-4 grid-rows-[auto_1fr]">
      <section className="col-span-1 col-start-1 row-span-2 row-start-1">
        <DashboardMenu />
      </section>
      {children}
    </main>
  );
}
