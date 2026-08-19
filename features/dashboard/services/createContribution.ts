"use server";
import { createContribution as createContributionDAL } from "@/data/dal/contribution/createContribution";
import { CategoryType, Contribution, IssueType } from "@/generated/prisma";
import { contributionsIssuesFormatter } from "../utils/contributionsIssuesFormatter";
import { revalidatePath } from "next/cache";

type StateType = { ok?: boolean; contribution?: Contribution; error?: string };

export const createContribution = async (
  prevState: StateType,
  formData: FormData,
): Promise<StateType> => {
  try {
    const contains = formData.getAll("contains") as IssueType[] | null;
    const dietaryIssues = contributionsIssuesFormatter(contains || []);
    const contributionCreateData = {
      name: formData.get("name") as string,
      servings: Number(formData.get("servings") as string),
      category: formData.get("category") as CategoryType,
      contains: dietaryIssues || undefined,
      description: formData.get("description") as string | null,
      invite: { connect: { id: Number(formData.get("invite") as string) } },
    };

    const contribution = await createContributionDAL(contributionCreateData);
    revalidatePath(`/dashboard/events/${contribution.invite.eventId}`);
    return {
      ok: true,
      contribution,
    };
  } catch (e) {
    return {
      ok: false,
      error: "Failed to create contribution",
    };
  }
};
