import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import Event from "../models/event.js";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await Event.find();
    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    return res.json(events);
  } catch (e) {
    next(e); //e is forwarderd to the error handling function in app
  }
};

export const searchEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hostId = req.query.host as string;
    if (hostId) {
      if (!mongoose.Types.ObjectId.isValid(hostId)) {
        return res
          .status(400)
          .json({ error: "The ID you provided was not in a valid format." });
      }
      const events = await Event.find({ "host.id": hostId });
      if (events.length != 0) {
        return res.json(events);
      } else {
        return res
          .status(404)
          .json({ error: `No events found with host id ${hostId}` });
      }
    }
  } catch (e) {
    next(e);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const events = await Event.find({ _id: id });
  if (events.length != 0) {
    return res.json(events);
  } else {
    return res.status(404).json({ error: `No events found with id ${id}` });
  }
};
