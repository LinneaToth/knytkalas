import { IssueType } from "@/generated/prisma";
const issues = Object.values(IssueType);
const issueSet = new Set<string>(issues);

export function isIssueType(value: unknown): value is IssueType {
  return typeof value === "string" && issueSet.has(value);
}
