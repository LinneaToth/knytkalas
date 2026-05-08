import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: [
        true,
        "The e-mail address is already registered with an existing user",
      ],
    },
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
    invitesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }],
    eventsHosting: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true },
); //timestamps will add createdAt and updatedAt

const User = mongoose.model("User", userSchema); //User -> collection "users", through mongoose's interpretation

export default User;
