import { type Request, type Response, type NextFunction } from "express";
import User from "../models/user.js";

//Get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    if (users.length != 0) {
      return res.json(users);
    } else {
      return res.status(404).json({ error: "No users found" });
    }
  } catch (e) {
    next(e);
  }
};

//Delete user

//Update user allergies
