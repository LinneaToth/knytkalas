"use server";

import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.onboarded) redirect("/login");

  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline>Personal settings</FeatureHeadline>
      </header>
      <section className="col-span-3 col-start-2 row-start-2 p-10">
        <h3>Name:</h3>
        {currentUser.name}
        <h3>Registered dietary avoidance:</h3>
        {currentUser.avoids.length === 0 && "None registered"}
        {currentUser.avoids.length > 0 && (
          <ul>
            {currentUser.avoids.map((avoid) => (
              <li key={avoid}>{avoid}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
