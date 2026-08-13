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
};

export default function ContributionsDetails({
  contributions,
  inviteId,
  avoids,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        listRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <ContentBox styling="gap-8">
      <header className="flex items-center justify-between" ref={listRef}>
        <h2 className="uppercase">Contributions</h2>
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
        className={`grid transition-all duration-500 ease-in-out ${
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
          />
          <CreateContribution inviteId={inviteId} />
        </div>
      </div>
    </ContentBox>
  );
}
