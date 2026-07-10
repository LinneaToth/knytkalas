"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getEvent } from "@/data/dal/event/getEvent";
import { isGuestAtEvent } from "../utils/isGuestAtEvent";

export const getEventDetails = async (eventId: number) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId)
      throw new Error(
        "Only signed in members at Knytkalas are able to see event details",
      );

    const event = await getEvent(eventId);

    if (!event) throw new Error("No event found");

    if (await isGuestAtEvent(userId, event.id)) return event;
  } catch (e) {
    //handle error, for now it is just logged:
    console.error(e);
  }
};
