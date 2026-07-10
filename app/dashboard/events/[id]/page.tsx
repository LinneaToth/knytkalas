"use server";

import { getEventDetails } from "@/features/dashboard/services/getEventDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventDetails(Number(id));
  return <h2>{event ? event.occasion : "No such event found"}</h2>;
}
