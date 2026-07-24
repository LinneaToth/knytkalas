"use client";

import { IssueType } from "@/generated/prisma";
import { getContributionsByEvent } from "../services/getContributionsByEvent";
import { useState } from "react";
import { deleteContribution } from "../services/deleteContribution";
import { sortContributions } from "../utils/sortContributions";
import Button from "@/ui/components/Button";

type Props = {
  contributions: Awaited<ReturnType<typeof getContributionsByEvent>>;
  avoids?: IssueType[];
  usersInviteId: number;
};

export default function ContributionsList({
  contributions,
  avoids,
  usersInviteId,
}: Props) {
  const [sortBy, setSortBy] = useState<"user" | "category">("user");

  if (!contributions) return <></>;

  const shownContributions = sortContributions(contributions, sortBy);

  return (
    <section>
      <h3>Guests are bringing:</h3>
      <p>Sort by: </p>
      <button onClick={() => setSortBy("category")}>Categories</button>{" "}
      <button onClick={() => setSortBy("user")}>User</button>
      <ul>
        {shownContributions ? (
          shownContributions.map((contribution) => {
            const issuesFound = [
              ...new Set(avoids).intersection(
                new Set(contribution.contribution.contains),
              ),
            ];
            return (
              <li
                className={`${issuesFound.length > 0 ? "bg-red-200" : ""}`}
                key={
                  contribution.inviteId +
                  contribution.contribution.name +
                  contribution.contribution.servings
                }
              >
                <p>
                  {contribution.contribution.category} -{" "}
                  {contribution.contribution.name} -{" "}
                  {contribution.contribution.servings &&
                    contribution.contribution.servings > 0 &&
                    `${contribution.contribution.servings} servings.`}{" "}
                  Brought by {contribution.guestName}
                </p>
                {issuesFound.length > 0 && "Contains: "}
                {issuesFound.map((i) => (
                  <span key={i} className="bg-primary mx-3">
                    {i}
                  </span>
                ))}
                {contribution.inviteId === usersInviteId && (
                  <button
                    onClick={() =>
                      deleteContribution(contribution.contribution.id)
                    }
                  >
                    DELETE
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <p>No contributions are listed for this event</p>
        )}
      </ul>
    </section>
  );
}
