import { Account, Session } from "better-auth";

export type User = {
  id: string;
  createdAt?: Date;
  email: string;
  name: string;
  sentInvites?: Invite[];
  receivedInvites?: Invite[];
  hostedEvents?: Event[];
  avoids: IssueType[];
  emailVerified?: boolean;
  image?: string;
  updatedAt?: Date;
  sessions?: Session[];
  accounts?: Account[];
};

export type NewUser = {
  email: string;
  name: string;
  avoids: IssueType[];
};

export type Invite = {
  placeholder: string;
  //WIP
};

export type Event = {
  occasion: string;
  //WIP
};

export type IssueType =
  | "MEAT"
  | "DAIRY"
  | "LACTOSE"
  | "NUTS"
  | "GLUTEN"
  | "EGG"
  | "SHELLFISH"
  | "FISH"
  | "ANIMALBASED";
