import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    event: {
      occasion: {
        type: String,
        required: [true, "Occasion must be specified"],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Event must be assigned with a valid ID"],
      },
    },
    invitee: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Guest must be assigned to the invite"],
      },
    },
    invitedBy: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
          true,
          "The person inviting the guest must be assigned to the invite",
        ],
      },
    },
    status: {
      type: String,
      trim: true,
      lowercase: true,
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
