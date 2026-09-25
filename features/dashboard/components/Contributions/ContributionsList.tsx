"use client";

import { IssueType } from "@/generated/prisma";
import { getContributionsByEvent } from "../../services/getContributionsByEvent";
import { useState } from "react";
import { sortContributions } from "../../utils/sortContributions";
import Button from "@/ui/components/Button";
import ContributionsCard from "./ContributionsCard";

type Props = {
  contributions: Awaited<ReturnType<typeof getContributionsByEvent>>;
  avoids?: IssueType[];
  usersInviteId: number;
  eventHasBeen: boolean;
};

export default function ContributionsList({
  contributions,
  avoids,
  usersInviteId,
  eventHasBeen,
}: Props) {
  const [sortBy, setSortBy] = useState<"user" | "category">("user");
  if (!contributions) return <></>;

  const shownContributions = sortContributions(contributions, sortBy);

  return (
    <section>
      <div className="flex content-center justify-end gap-3">
        <p className="mr-auto">group by: </p>
        <Button
          hoverMove={false}
          size="sm"
          variant={sortBy === "category" ? "dark" : "secondary"}
          onClick={() => setSortBy("category")}
        >
          Categories
        </Button>{" "}
        <Button
          hoverMove={false}
          size="sm"
          variant={sortBy === "user" ? "dark" : "secondary"}
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
                eventHasBeen={eventHasBeen}
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
