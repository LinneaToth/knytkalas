"use server";

import { NewUser } from "@/types/entityTypes";
import { onboardUser } from "@/data/dal/user/onboardUser";
import { isIssueType } from "@/utils/isIssueType";

export const onboard = async (user: NewUser) => {
  const avoids = user.avoids.filter(isIssueType);
  try {
    //ADD A BUNCH OF LOGIC FOR DIETARY ISSUES HERE! If they don't do dairy, they don't do lactose either. If they are vegan, all animal based issues need to be crossed out as well.
    await onboardUser({ ...user, avoids });
    return { success: "User registered" };
  } catch (e) {
    const err = e as Error;
    return { error: err.message };
  }
};
