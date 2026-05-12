import { type Request, type Response, type NextFunction } from "express";
import Invite from "../models/invite.js";
import {
  createInvite,
  deleteInvite,
  getAllInvites,
} from "../services/inviteService.js";

//Get all invites
export const getInvites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invites = await getAllInvites();
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
    const newInvite = await createInvite(eventId, inviteeId, invitedById);

    if ("error" in newInvite) {
      if (newInvite.error === "404-event")
        return res.status(404).json({ error: "Event not found" });
      if (newInvite.error === "404-invitee")
        return res.status(404).json({ error: "Invitee not found" });
      if (newInvite.error === "404-invitedby")
        return res.status(404).json({ error: "Invited by not found" });
      if (newInvite.error === "409-exists")
        return res.status(409).json({ error: "Invite already exists" }); //409: server conflict
    }

    res.status(201).json(newInvite);
  } catch (e) {
    next(e);
  }
};

//Delete invite and update references
export const delInvite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { id } = req.params;
    if (typeof id != "string") id = id[0];

    const deletedInvite = await deleteInvite(id);
    if (!deletedInvite.deleted)
      return res.status(404).json({ error: "No invite found" });
    return res.status(200).json(deletedInvite);
  } catch (e) {
    next(e);
  }
};

// Edit contributions
// Will expect either "Edit, Delete or Add" as action
//WIP!!! Lacks functionality and is not yet properly properly divided into controller vs service

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
        const { invId, contributionId } = req.body;
        const invite = await Invite.findById(invId);
        if (!invite) return res.status(404).json({ error: "Invite not found" });
        const origAmtContributions = invite.contributions.length;

        invite.contributions.pull(contributionId);

        if (invite.contributions.length === origAmtContributions) {
          return res.status(404).json({ error: "Contribution not found" });
        }

        await invite.save();
        return res.json(invite);

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    next(e);
  }
};
