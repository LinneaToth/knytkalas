import ContentBox from "@/ui/components/ContentBox";
import ContributionsList from "./ContributionsList";
import CreateContribution from "./CreateContribution";
import { IssueType } from "@/generated/prisma";

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
  return (
    <>
      <ContentBox styling="gap-8">
        {" "}
        <h2 className="uppercase">Contributions</h2>
        <ContributionsList
          contributions={contributions}
          avoids={avoids}
          usersInviteId={inviteId}
        />{" "}
        <CreateContribution inviteId={inviteId} />
      </ContentBox>{" "}
    </>
  );
}
