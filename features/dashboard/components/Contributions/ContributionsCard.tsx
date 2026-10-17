"use client";

import { useState, useTransition } from "react";
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
  eventHasBeen: boolean;
};

export default function ContributionsCard({
  issuesFound,
  contribution,
  usersInviteId,
  eventHasBeen,
}: Props) {
  const isUsersContribution = contribution.inviteId === usersInviteId;
  const [pending, startTransition] = useTransition(); //pending is true while the action is running
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (
      !confirm(
        `This will permanently delete the contribution ${contribution.contribution.name}.`,
      )
    )
      return;

    //confirm() stays outside the transition, so pending only covers the server call. Thrown errors reach the nearest error boundary, expected ones are stored in the error state
    startTransition(async () => {
      setError(null);
      const deleteResult = await deleteContribution(
        contribution.contribution.id,
      );
      if (deleteResult?.error) setError(deleteResult.error);
    });
  };

  const otherIssues = contribution.contribution.contains.filter(
    (issue) => !issuesFound.includes(issue),
  );

  return (
    <li
      className={`flex flex-col gap-5 rounded-2xl border p-5 shadow ${issuesFound.length > 0 ? "border-error bg-error/10" : "border-primary bg-card-background/60"}`}
    >
      <header className="flex justify-between">
        <h3>
          <span className="font-bold">
            {capitalize(contribution.contribution.category)}
          </span>{" "}
          - {contribution.contribution.name}
        </h3>
        {isUsersContribution && !eventHasBeen && (
          <button
            className="text-secondary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
            onClick={handleDelete}
          >
            <Trash2 />
          </button>
        )}
      </header>
      {error && <p className="text-error">{error}</p>}
      {contribution.contribution.description && (
        <p>{contribution.contribution.description}</p>
      )}
      <p className="text-sm">
        {Number(contribution.contribution.servings) > 0 &&
          `${contribution.contribution.servings} servings -`}{" "}
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
