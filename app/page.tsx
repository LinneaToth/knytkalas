import { redirect } from "next/navigation";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";
import { getUser } from "@/data/dal/user/getUser";
import LandingPage from "@/features/landingpage/components/LandingPage";

export default async function Home() {
  let userId: string;
  try {
    userId = await getSessionUserId();
  } catch {
    return <LandingPage />;
  }

  const user = await getUser(userId);
  if (user.onboarded) redirect("/dashboard");

  return <LandingPage />;
}
