import mongoose from "mongoose";

export type UserInput = {
  name: string;
  email: string;
  dietaryRestrictions: {
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
};

export type EventInput = {
  startTime: Date;
  location: String;
  occasion: String;
  host: { name: string; id: mongoose.Types.ObjectId };
  description?: string;
  invites?: any[];
};

type Contribution = {
  name: string;
  amount: number;
  unit: string;
  dietaryRestrictions: {
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
};

export type InviteInput = {
  event: {
    occasion: string;
    id: mongoose.Types.ObjectId;
  };
  invitee: { name: string; id: mongoose.Types.ObjectId };
  invitedBy: { name: string; id: mongoose.Types.ObjectId };
  status: "accepted" | "pending" | "declined";
  contributions: Contribution[];
};
