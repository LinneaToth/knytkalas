import type { IssueType } from "@/generated/prisma";

export type EventData = { occasion: string; date: Date; id: number };

export type UserData = {
  name: string;
  email: string;
  onboarded: boolean;
  id: string;
  avoids?: IssueType[];
};

export type NewUser = {
  name: string;
  avoids: IssueType[];
};
