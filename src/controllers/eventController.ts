import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import Event from "../models/event.js";
import Invite from "../models/invite.js";
import type { InviteType } from "../types/types.js";
import { contributionsCompiler } from "../services/contributionsCompiler.js";

//Get all events
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

//Search for events with certain hosts, by ID
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

//Get event by ID
export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ _id: id });
    if (events.length != 0) {
      return res.json(events);
    } else {
      return res.status(404).json({ error: `No events found with id ${id}` });
    }
  } catch (e) {
    next(e);
  }
};

//Get all contributions for a certain event
export const getEventContributions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const relatedInvites = await Invite.find({ "event.id": id });
    if (relatedInvites.length === 0) {
      return res.status(404).json({
        error: "No invites found for this event",
      });
    }
    const eventContributions = await contributionsCompiler(
      relatedInvites as InviteType[],
    );

    return res.json({
      eventId: id,
      contributions: eventContributions,
    });
  } catch (e) {
    next(e);
  }
};
