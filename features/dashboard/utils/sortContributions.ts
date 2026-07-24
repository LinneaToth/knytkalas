import { getContributionsByEvent } from "../services/getContributionsByEvent";

export const sortContributions = (
  contributions: Awaited<ReturnType<typeof getContributionsByEvent>>,
  sortBy: "user" | "category",
) => {
  if (sortBy === "category")
    return contributions.sort((a, b) => {
      return a.contribution.category.localeCompare(b.contribution.category);
    });

  if (sortBy === "user")
    return contributions.sort((a, b) => {
      return a.guestName.localeCompare(b.guestName);
    });
};
