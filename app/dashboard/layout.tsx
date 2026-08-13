import DashboardMenu from "@/features/dashboard/components/DashboardMenu";
import NavBar from "@/features/pageFrame/components/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar mode="signedin" />
      <main className="bg-background mt-20 mr-auto ml-auto h-full min-h-0 w-full max-w-350 flex-1">
        {children}
      </main>
    </>
  );
}
