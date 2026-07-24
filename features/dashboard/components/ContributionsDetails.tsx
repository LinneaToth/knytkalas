import ContentBox from "@/ui/components/ContentBox";
import ContributionsList from "./ContributionsList";
import CreateContribution from "./CreateContribution";
import { IssueType } from "@/generated/prisma";

type Props = {
  contributions: Awaited<
    ReturnType<
      typeof import("../services/getContributionsByEvent").getContributionsByEvent
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
  return (
    <>
      <ContentBox>
        {" "}
        <h2>Food at this event</h2>
        <ContributionsList
          contributions={contributions}
          avoids={avoids}
          usersInviteId={inviteId}
        />
      </ContentBox>{" "}
      <ContentBox>
        <CreateContribution inviteId={inviteId} />
      </ContentBox>
    </>
  );
}
