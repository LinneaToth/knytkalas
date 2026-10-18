import { redirect } from "next/navigation";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";
import { getUser } from "@/data/dal/user/getUser";
import LandingPage from "@/features/landingpage/components/LandingPage";

export default async function Home() {
  const userId = await getSessionUserId();
  if (!userId) return <LandingPage />;

  const user = await getUser(userId);
  if (user && user.onboarded) redirect("/dashboard");

  return <LandingPage />;
}
