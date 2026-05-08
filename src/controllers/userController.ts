import { type Request, type Response, type NextFunction } from "express";
import User from "../models/user.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    if (!users) res.status(404).json({ error: "No users found" });
    res.json(users);
  } catch (e) {
    next(e);
  }
};
