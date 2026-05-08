import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    event: {
      occasion: String,
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    },
    invitee: {
      name: String,
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    invitedBy: {
      name: String,
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    contributions: [
      {
        name: String,
        amount: {
          type: Number,
          required: true,
          min: [1, "Amount must be 1 or more"],
        },
        unit: String,
        dietaryRestrictions: {
          dairy: { type: Boolean, default: false },
          gluten: { type: Boolean, default: false },
          nuts: { type: Boolean, default: false },
          shellfish: { type: Boolean, default: false },
          soy: { type: Boolean, default: false },
          egg: { type: Boolean, default: false },
          honey: { type: Boolean, default: false },
          meat: { type: Boolean, default: false },
          fish: { type: Boolean, default: false },
        },
      },
    ],
  },
  { timestamps: true },
); //timestamps add createdAt and updatedAt

const Invite = mongoose.model("Invite", inviteSchema); //Invite -> collection "invites", through mongoose's interpretation

export default Invite;
