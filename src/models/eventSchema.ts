import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  startTime: Date,
  location: String,
  occasion: String,
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }],
  host: { name: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  description: { type: String, default: "No description" },
}, { timestamps: true }); //timestamps add createdAt and updatedAt

//add if required and or unique etc 
 
const Event = mongoose.model("Event", eventSchema); //Event -> collection "events", through mongoose's interpretation

export default Event;

