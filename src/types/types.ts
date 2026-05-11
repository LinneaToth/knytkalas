import mongoose from "mongoose";

export type UserInput = {
  name: string;
  email: string;
  dietaryRestrictions: DietaryRestrictions;
};

export type DietaryRestriction =
  | "dairy"
  | "gluten"
  | "nuts"
  | "shellfish"
  | "soy"
  | "egg"
  | "honey"
  | "meat"
  | "fish";

export type DietaryRestrictions = {
  dairy?: boolean;
  gluten?: boolean;
  nuts?: boolean;
  shellfish?: boolean;
  soy?: boolean;
  egg?: boolean;
  honey?: boolean;
  meat?: boolean;
  fish?: boolean;
};

export type EventInput = {
  startTime: Date;
  location: string;
  occasion: string;
  host: { name: string; id: mongoose.Types.ObjectId };
  description?: string;
  invites?: any[];
};

export type ContributionType = {
  name: string;
  amount: number;
  unit: string;
  dietaryRestrictions: DietaryRestrictions;
};

export interface InviteInput {
  event: {
    occasion: string;
    id: mongoose.Types.ObjectId;
  };
  invitee: { name: string; id: mongoose.Types.ObjectId };
  invitedBy: { name: string; id: mongoose.Types.ObjectId };
  status: "accepted" | "pending" | "declined";
  contributions: ContributionType[];
}

export interface InviteType extends InviteInput {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
