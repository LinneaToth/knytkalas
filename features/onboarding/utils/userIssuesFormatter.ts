import { IssueType } from "@/generated/prisma";
import { isIssueType } from "@/utils/isIssueType";

export const userIssuesFormatter = (issues: IssueType[]) => {
  let formattedIssues: IssueType[];
  formattedIssues = issues.filter(isIssueType);

  const isVegan = formattedIssues.includes("ANIMALBASED");

  if (isVegan) {
    formattedIssues = [
      ...formattedIssues,
      "EGG",
      "MEAT",
      "DAIRY",
      "LACTOSE",
      "FISH",
      "SHELLFISH",
    ];
    formattedIssues = [...new Set(formattedIssues)];
  }

  if (formattedIssues.includes("LACTOSE")) {
    formattedIssues = [...formattedIssues, "DAIRY"];
    formattedIssues = [...new Set(formattedIssues)];
  }

  return formattedIssues;
};
