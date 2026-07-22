import ContentBox from "@/ui/components/ContentBox";
import ContributionsList from "./ContributionsList";

type Props = {
  contributions: Awaited<
    ReturnType<
      typeof import("../services/getContributionsByEvent").getContributionsByEvent
    >
  >;
};

export default function ContributionsDetails({ contributions }: Props) {
  return (
    <ContentBox>
      <h2>Contributions</h2>
      <ContributionsList contributions={contributions} />
    </ContentBox>
  );
}
