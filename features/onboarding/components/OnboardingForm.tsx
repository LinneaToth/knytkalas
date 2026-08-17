"use client";
import { useSession } from "@/data/auth/auth-client";
import Form from "next/form";
import { onboard } from "../services/onboard";
import { IssueType } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { isPathSafe } from "@/features/auth/utils/isPathSafe";
import Button from "@/ui/components/Button";

type Props = {
  callbackUrl: string;
};

export default function OnboardingForm({ callbackUrl = "/dashboard" }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const url = isPathSafe(callbackUrl) ? callbackUrl : "/dashboard";

  async function handleAction(formData: FormData) {
    const user = {
      name: (formData.get("name") as string) || "",
      avoids: formData
        .getAll("avoids")
        .map((value) => String(value) as IssueType),
    };
    await onboard(user);
    router.push(url);
  }

  return (
    <>
      <h2>
        You are registering with the google account for{" "}
        <span className="block">{data?.user.email}</span>
      </h2>
      <Form
        action={handleAction}
        className="flex w-full flex-col items-start justify-start gap-5"
      >
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="name" className="mr-auto font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-background text-foreground focus:bg-focus w-full p-3"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="mr-auto font-medium">Dietary Restrictions</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(IssueType).map((issue) => {
              return (
                <label
                  htmlFor={issue.toLowerCase()}
                  key={issue + "-key"}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    id={issue.toLowerCase()}
                    type="checkbox"
                    name="avoids"
                    value={issue}
                  />
                  <span className="text-sm">
                    {issue === "ANIMALBASED" ? "VEGAN" : issue}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <Button type="submit" width="full">
          Join the party!
        </Button>
      </Form>
    </>
  );
}
