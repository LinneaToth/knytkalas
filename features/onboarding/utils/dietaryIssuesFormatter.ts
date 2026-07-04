import { IssueType } from "@/generated/prisma";
import { isIssueType } from "@/utils/isIssueType";

export const dietaryIssuesFormatter = (issues: IssueType[]) => {
  let formattedIssues: IssueType[];
  formattedIssues = issues.filter(isIssueType);

  if (formattedIssues.includes("ANIMALBASED")) {
    formattedIssues = [
      ...formattedIssues,
      "DAIRY",
      "EGG",
      "FISH",
      "LACTOSE",
      "MEAT",
      "SHELLFISH",
    ];
    formattedIssues = [...new Set(formattedIssues)];
  }

  if (formattedIssues.includes("DAIRY")) {
    formattedIssues = [...formattedIssues, "LACTOSE"];
    formattedIssues = [...new Set(formattedIssues)];
  }

  return formattedIssues;
};
