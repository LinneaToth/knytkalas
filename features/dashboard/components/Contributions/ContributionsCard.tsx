import { IssueType } from "@/generated/prisma";
import AlertIssuePills from "./IssuePills";
import { getContributionsByEvent } from "../../services/getContributionsByEvent";
import { deleteContribution } from "../../services/deleteContribution";
import { capitalize } from "@/utils/capitalize";

type Props = {
  issuesFound: IssueType[];
  contribution: Awaited<ReturnType<typeof getContributionsByEvent>>[number];
  usersInviteId: number;
};

export default function ContributionsCard({
  issuesFound,
  contribution,
  usersInviteId,
}: Props) {
  const isUsersContribution = contribution.inviteId === usersInviteId;

  const otherIssues = contribution.contribution.contains.filter(
    (issue) => !issuesFound.includes(issue),
  );

  return (
    <li
      className={`rounded-xl p-3 shadow ${issuesFound.length > 0 ? "border-red-200" : "border-primary"}`}
    >
      <p>
        <span className="font-bold">
          {capitalize(contribution.contribution.category)}
        </span>{" "}
        - {contribution.contribution.name}
        {Number(contribution.contribution.servings) > 0 &&
          `- ${contribution.contribution.servings} servings.`}{" "}
      </p>
      <p className="text-sm">
        Brought by {isUsersContribution ? "you" : contribution.guestName}
      </p>
      <div className="mt-5 flex justify-between">
        {" "}
        {isUsersContribution && (
          <button
            className="text-secondary cursor-pointer"
            onClick={() => deleteContribution(contribution.contribution.id)}
          >
            DELETE
          </button>
        )}
        <AlertIssuePills alertIssues={issuesFound} otherIssues={otherIssues} />
      </div>
    </li>
  );
}
