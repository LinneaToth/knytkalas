import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  creation: Date,
  startTime: Date,
  location: String,
  occasion: String,
  invites: Array,
  host: { name: String, id: mongoose.Types.ObjectId },
});

const Event = mongoose.model("Event", eventSchema); //Event -> collection "events", through mongoose's interpretation

export default Event;
