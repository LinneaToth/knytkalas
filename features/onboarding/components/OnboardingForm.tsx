"use client";
import { useSession } from "@/data/auth/auth-client";
import Form from "next/form";
import { onboard } from "../services/onboard";
import { IssueType } from "@/generated/prisma";

export default function OnboardingForm() {
  const { data } = useSession();

  async function handleAction(formData: FormData) {
    const user = {
      name: (formData.get("name") as string) || "",
      avoids: formData
        .getAll("avoids")
        .map((value) => String(value) as IssueType),
    };
    await onboard(user);
  }

  return (
    <>
      <p>You are registering with the e-mail: {data?.user.email}</p>
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
        <button type="submit" className="bg-amber-300 cursor-pointer">
          Join the party!
        </button>
      </Form>
    </>
  );
}
