import { IssueType } from "@/generated/prisma";
import { isIssueType } from "@/utils/isIssueType";

export const dietaryIssuesFormatter = (issues: IssueType[]) => {
  let formattedIssues: IssueType[];
  formattedIssues = issues.filter(isIssueType);

  const isAnimalBased =
    formattedIssues.includes("DAIRY") ||
    formattedIssues.includes("EGG") ||
    formattedIssues.includes("FISH") ||
    formattedIssues.includes("MEAT") ||
    formattedIssues.includes("SHELLFISH") ||
    formattedIssues.includes("LACTOSE");

  if (isAnimalBased) {
    formattedIssues = [...formattedIssues, "ANIMALBASED"];
    formattedIssues = [...new Set(formattedIssues)];
  }

  if (formattedIssues.includes("LACTOSE")) {
    formattedIssues = [...formattedIssues, "DAIRY"];
    formattedIssues = [...new Set(formattedIssues)];
  }

  return formattedIssues;
};
