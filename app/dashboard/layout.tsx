import Footer from "@/features/pageFrame/components/Footer";
import NavBar from "@/features/pageFrame/components/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar mode="signedin" />
      <main className="mt-20 mr-auto ml-auto w-full max-w-350 flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
