import { IssueType } from "@/generated/prisma";

type Props = {
  alertIssues: IssueType[];
  otherIssues: IssueType[];
};

export default function IssuePills({ alertIssues, otherIssues }: Props) {
  return (
    <section className={`flex w-full justify-end gap-3`}>
      {alertIssues.map((issue) => (
        <div
          key={"issue" + issue}
          className={`bg-card-background text-primary-darkest rounded-full py-1 text-xs font-semibold`}
        >
          ⚠️ {issue}
        </div>
      ))}

      {otherIssues.map((issue) => (
        <div
          key={"issue" + issue}
          className="bg-card-background text-primary-darkest rounded-full py-1 text-xs"
        >
          {issue}
        </div>
      ))}
    </section>
  );
}
