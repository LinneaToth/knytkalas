import { IssueType } from "@/generated/prisma";

type Props = {
  alertIssues: IssueType[];
  otherIssues: IssueType[];
  justify: "end" | "start" | "center";
};

export default function IssuePills({
  alertIssues,
  otherIssues,
  justify,
}: Props) {
  const flexJustify = "justify-" + justify;

  return (
    <section className={`flex w-full ${flexJustify} flex-wrap gap-3`}>
      {alertIssues.map((issue) => (
        <div
          key={"issue" + issue}
          className={`bg-card-background text-primary-darkest rounded-full px-3 py-2 text-xs font-semibold`}
        >
          ⚠️ {issue}
        </div>
      ))}

      {otherIssues.map((issue) => (
        <div
          key={"issue" + issue}
          className="bg-card-background text-primary-darkest rounded-full px-3 py-2 text-xs"
        >
          {issue}
        </div>
      ))}
    </section>
  );
}
