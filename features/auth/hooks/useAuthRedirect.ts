"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import { UserData } from "@/types/entityTypes";
import { isPathSafe } from "../utils/isPathSafe";

export function useAuthRedirect(callbackUrl: string) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const url = isPathSafe(callbackUrl) ? callbackUrl : "/";

  useEffect(() => {
    const getUser = async () => {
      try {
        const sessionUserId = await getCurrentUserId();
        if (!sessionUserId) {
          setIsLoading(false);
          return;
        }

        const currentUserData = await getCurrentUser(sessionUserId);
        if (currentUserData) {
          setCurrentUser(currentUserData);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (isLoading || !currentUser) return;

    if (currentUser.onboarded) {
      router.push(url);
    } else {
      router.push("/onboarding");
    }
  }, [currentUser, url, router, isLoading]);

  return { currentUser, isLoading };
}
