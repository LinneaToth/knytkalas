"use client";

import { IssueType } from "@/generated/prisma";
import { getContributionsByEvent } from "../../services/getContributionsByEvent";
import { useState } from "react";
import { deleteContribution } from "../../services/deleteContribution";
import { sortContributions } from "../../utils/sortContributions";
import Button from "@/ui/components/Button";
import ContributionsCard from "./ContributionsCard";

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
      <div className="flex content-center justify-end gap-3">
        <p className="mr-auto">Sort by: </p>
        <Button
          size="s"
          variant={sortBy === "category" ? "dark" : "outline"}
          onClick={() => setSortBy("category")}
        >
          Categories
        </Button>{" "}
        <Button
          size="s"
          variant={sortBy === "user" ? "dark" : "outline"}
          onClick={() => setSortBy("user")}
        >
          User
        </Button>
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        {shownContributions ? (
          shownContributions.map((contribution) => {
            const issuesFound = [
              ...new Set(avoids).intersection(
                new Set(contribution.contribution.contains),
              ),
            ];
            return (
              <ContributionsCard
                key={
                  contribution.inviteId +
                  contribution.contribution.name +
                  contribution.contribution.servings
                }
                issuesFound={issuesFound}
                contribution={contribution}
                usersInviteId={usersInviteId}
              />
            );
          })
        ) : (
          <p>No contributions are listed for this event</p>
        )}
      </ul>
    </section>
  );
}
