import { type Request, type Response, type NextFunction } from "express";
import Invite from "../models/schemas/invite.js";
import { findContrMatch } from "../services/findContrMatch.js";
import User from "../models/schemas/user.js";
import Event from "../models/schemas/event.js";

//Get all invites
export const getInvites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invites = await Invite.find();
    if (invites.length != 0) {
      return res.json(invites);
    } else {
      return res.status(404).json({ error: "No invites found" });
    }
  } catch (e) {
    next(e);
  }
};

//Create new invite
export const addInvite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, inviteeId, invitedById } = req.body;

  try {
    const [event, invitee, invBy] = await Promise.all([
      Event.findById(eventId),
      User.findById(inviteeId),
      User.findById(invitedById),
    ]);

    if (!event) return res.status(404).json({ error: "Event not found" });
    if (!invitee)
      return res.status(404).json({ error: "User not found for invitee" });
    if (!invBy)
      return res.status(404).json({ error: "User not found for invited by" });

    const alreadyInvited = await Invite.find({
      "invitee.id": invitee._id,
      "event.id": event._id,
    });

    if (alreadyInvited.length !== 0)
      return res
        .status(409)
        .json({ error: "User is already invited to this event" });

    const newInvite = await new Invite({
      event: { occasion: event.occasion, id: event._id },
      invitee: { name: invitee.name, id: invitee._id },
      invitedBy: { name: invBy.name, id: invBy._id },
    }).save();
    res.status(201).json(newInvite);
  } catch (e) {
    next(e);
  }
};

// Edit contributions
// Will expect either "Edit, Delete or Add" as action
//WIP!!

export const updateContributions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { action, contribution, invId } = req.body;

  try {
    const invite = await Invite.findById(invId);
    if (!invite) {
      return res.status(404).json({ error: "Invite not found" });
    }

    switch (action) {
      case "add":
        return res.status(501).json({
          error: 'Functionality "add" is not yet implemented for contributions',
        });
      case "edit":
        return res.status(501).json({
          error:
            'Functionality "edit" is not yet implemented for contributions',
        });
      case "delete":
        const match = findContrMatch(contribution, invite.contributions);
        if (!match) {
          return res.status(404).json({ error: "Contribution not found" });
        }
        invite.contributions.pull({
          name: match?.name,
        });
        await invite.save();
        return res.json(invite);

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    next(e);
  }
};
