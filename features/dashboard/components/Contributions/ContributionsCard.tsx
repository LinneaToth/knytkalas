import { Trash2 } from "lucide-react";
import { IssueType } from "@/generated/prisma";
import IssuePills from "./IssuePills";
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
      className={`flex flex-col gap-5 rounded-l p-3 shadow ${issuesFound.length > 0 ? "border-red-200" : "border-primary"}`}
    >
      <header className="flex justify-between">
        <h3>
          <span className="font-bold">
            {capitalize(contribution.contribution.category)}
          </span>{" "}
          - {contribution.contribution.name}
          {Number(contribution.contribution.servings) > 0 &&
            `- ${contribution.contribution.servings} servings.`}{" "}
        </h3>
        {isUsersContribution && (
          <button
            className="text-secondary cursor-pointer"
            onClick={() => {
              if (
                confirm(
                  `This will permanently delte the contribution ${contribution.contribution.name}.`,
                )
              ) {
                deleteContribution(contribution.contribution.id);
              }
            }}
          >
            <Trash2 />
          </button>
        )}
      </header>
      {contribution.contribution.description && (
        <p>{contribution.contribution.description}</p>
      )}
      <p className="text-sm">
        Brought by {isUsersContribution ? "you" : contribution.guestName}
      </p>
      <div className="flex justify-between">
        {" "}
        <IssuePills
          alertIssues={issuesFound}
          otherIssues={otherIssues}
          justify="end"
        />
      </div>
    </li>
  );
}
