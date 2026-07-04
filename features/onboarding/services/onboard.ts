"use server";

import { NewUser } from "@/types/entityTypes";
import { onboardUser } from "@/data/dal/user/onboardUser";
import { dietaryIssuesFormatter } from "../utils/dietaryIssuesFormatter";

export const onboard = async (user: NewUser) => {
  const avoids = dietaryIssuesFormatter(user.avoids);
  try {
    await onboardUser({ ...user, avoids });
    return { success: "User registered" };
  } catch (e) {
    const err = e as Error;
    return { error: err.message };
  }
};
