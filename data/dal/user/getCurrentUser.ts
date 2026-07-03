"server-only";

import { auth } from "../../auth/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //Check if there is currently a user at all.

  //If there is a user, use their ID from better auth to get their data from DB (since better auth only stores and shows core fields, not the ones particularly relevant to my project.)

  //Curate the data and only return what the app might need. Make certain to pay attention to if the person is onboarded or not.
  //needs onboarding: minimal info (id, email), onboarded: full profile (avoids, events and invites etc)
};
