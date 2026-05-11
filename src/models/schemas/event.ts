import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: [true, "The event needs a date and start time"],
    },
    location: {
      type: String,
      required: [true, "Location must be entered for the event"],
    },
    occasion: {
      type: String,
      required: [true, "Occasion must be set for the event"],
    },
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }],
    host: {
      name: {
        type: String,
        required: [true, "Host name is needed for the event"],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Host ID is needed for the event"],
      },
    },
    description: { type: String, default: "No description" },
  },
  { timestamps: true }, //timestamps add createdAt and updatedAt
);

const Event = mongoose.model("Event", eventSchema); //Event -> collection "events", through mongoose's interpretation

export default Event;
