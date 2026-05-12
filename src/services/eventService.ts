import Event from "../models/event.js";

export const getAllEvents = async () => await Event.find();

export const getEventByHost = async (hostId: string) =>
  await Event.find({ "host.id": hostId });

export const getEventById = async (eventId: string) =>
  await Event.findById(eventId);
