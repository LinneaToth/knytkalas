import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import type { InviteType } from "../types/types.js";
import { contributionsCompiler } from "../utils/contributionsCompiler.js";
import {
  getAllEvents,
  getEventByHost,
  getEventById,
} from "../services/eventService.js";
import { findInviteByEvent } from "../services/inviteService.js";

//Get all events
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await getAllEvents();
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
      const events = await getEventByHost(hostId);
      if (events.length != 0) {
        return res.json(events);
      } else {
        return res
          .status(404)
          .json({ error: `No events found with host id ${hostId}` });
      }
    } else {
      res.status(400).json({
        error: "Only search through hostId is available at the moment",
      });
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
    let { id } = req.params;
    if (typeof id != "string") id = id[0];

    const event = await getEventById(id);
    if (event) {
      return res.json(event);
    } else {
      return res.status(404).json({ error: `No event found with id ${id}` });
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
    let { id } = req.params;
    if (typeof id != "string") id = id[0];
    const relatedInvites = await findInviteByEvent(id);
    if (relatedInvites.length === 0) {
      return res.status(404).json({
        error: "No invites found for this event",
      });
    }
    const eventContributions = contributionsCompiler(
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
