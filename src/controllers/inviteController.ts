import { type Request, type Response, type NextFunction } from "express";
import Invite from "../models/invite.js";

export const getInvites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invites = await Invite.find();
    if (!invites) res.status(404).json({ error: "No invites found" });
    res.json(invites);
  } catch (e) {
    next(e);
  }
};
