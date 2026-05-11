import { type Request, type Response, type NextFunction } from "express";
import Invite from "../models/invite.js";
import { findContrMatch } from "../services/findContrMatch.js";

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
  const data = req.body;
  try {
    const newInvite = await new Invite(data).save();
    res.status(201).json(newInvite);
  } catch (e) {
    next(e);
  }
};

// Edit contributions
// Will expect either "Edit, Delete or Add" as action

export const updateContributions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { action, contribution, invId } = req.body;

  const invite = await Invite.findById(invId);
  if (!invite) {
    return res.status(404).json({ error: "Invite not found" });
  }

  switch (action) {
    case "add":
      //if it doesn't exist, add it.
      break;

    case "edit":
      //match?
      //Delete match
      //Add updated match
      break;

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
      res.status(400).json({ error: "Unknown action" });
  }
};
