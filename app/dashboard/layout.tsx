import DashboardMenu from "@/features/dashboard/components/DashboardMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-background grid h-full min-h-0 w-full max-w-350 flex-1 grid-cols-4 grid-rows-[auto_1fr]">
        <section className="col-span-1 col-start-1 row-start-1 -row-end-1">
          <DashboardMenu />
        </section>
        {children}
      </main>
    </>
  );
}
