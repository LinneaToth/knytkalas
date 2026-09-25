"use client";

import { useState, useRef, useEffect } from "react";
import ContentBox from "@/ui/components/ContentBox";
import ContributionsList from "./ContributionsList";
import CreateContribution from "./CreateContribution";
import { IssueType } from "@/generated/prisma";
import { ChevronUp, ChevronDown } from "lucide-react";

type Props = {
  contributions: Awaited<
    ReturnType<
      typeof import("../../services/getContributionsByEvent").getContributionsByEvent
    >
  >;
  inviteId: number;
  avoids?: IssueType[];
  eventHasBeen: boolean;
};

export default function ContributionsDetails({
  contributions,
  inviteId,
  avoids,
  eventHasBeen,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <ContentBox styling="gap-8" glass={true}>
      <header className="flex items-center justify-between" ref={listRef}>
        <h2 className="uppercase">On the table</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex transition-transform duration-200 hover:cursor-pointer"
        >
          {isExpanded ? (
            <>
              Hide <ChevronUp />
            </>
          ) : (
            <>
              Show <ChevronDown />
            </>
          )}
        </button>
      </header>

      <div
        className={`grid transition-all duration-150 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8 overflow-hidden">
          <ContributionsList
            contributions={contributions}
            avoids={avoids}
            usersInviteId={inviteId}
            eventHasBeen={eventHasBeen}
          />
          {!eventHasBeen && <CreateContribution inviteId={inviteId} />}
        </div>
      </div>
    </ContentBox>
  );
}
