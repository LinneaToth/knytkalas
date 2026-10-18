"use server";

import { NewUser } from "@/types/entityTypes";
import { onboardUser } from "@/data/dal/user/onboardUser";
import { userIssuesFormatter } from "../utils/userIssuesFormatter";

export const onboard = async (user: NewUser) => {
  const avoids = userIssuesFormatter(user.avoids);
  const onboardedResult = await onboardUser({ ...user, avoids });
  return onboardedResult;
};
