"use server";

import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import ContentBox from "@/ui/components/ContentBox";
import { redirect } from "next/navigation";
import { User, Utensils } from "lucide-react";

import DeleteAccountButton from "@/features/dashboard/components/DeleteAccountButton";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.onboarded) redirect("/login");

  return (
    <>
      <header className="p-10">
        <h1 className="text-4xl">Knytkalas Profile</h1>
      </header>
      <div className="px-10">
        <ContentBox styling="gap-5 mb-10">
          <p className="flex items-center gap-3">
            <User size={18} />
            {currentUser.name}
          </p>

          <h3 className="flex items-center gap-3">
            <Utensils size={18} />
            Registered dietary issues
          </h3>
          {currentUser.avoids.length === 0 && <p>None registered</p>}
          {currentUser.avoids.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentUser.avoids.map((avoid) => (
                <span
                  key={avoid}
                  className="bg-primary-lighter text-primary-darkest rounded-full px-3 py-1 text-xs font-medium"
                >
                  {avoid}
                </span>
              ))}
            </div>
          )}
        </ContentBox>
        <DeleteAccountButton userId={currentUser.id} />
      </div>
    </>
  );
}
