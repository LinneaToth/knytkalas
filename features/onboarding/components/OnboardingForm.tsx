"use client";
import { useSession } from "@/data/auth/auth-client";
import Form from "next/form";
import { onboard } from "../services/onboard";
import { IssueType } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { isPathSafe } from "@/features/auth/utils/isPathSafe";

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
      <h2>You are registering with the e-mail: {data?.user.email}</h2>
      <Form action={handleAction}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" placeholder="Enter your name" />
        <fieldset>
          <legend>Dietary Restrictions</legend>
          {Object.values(IssueType).map((issue) => {
            return (
              <label htmlFor={issue.toLowerCase()} key={issue + "-key"}>
                <input
                  id={issue.toLowerCase()}
                  type="checkbox"
                  name="avoids"
                  value={issue}
                />{" "}
                {issue === "ANIMALBASED" ? "VEGAN" : issue}
              </label>
            );
          })}
        </fieldset>
        <button type="submit" className="cursor-pointer bg-amber-300">
          Join the party!
        </button>
      </Form>
    </>
  );
}
