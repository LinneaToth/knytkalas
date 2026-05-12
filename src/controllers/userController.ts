import { type Request, type Response, type NextFunction } from "express";
import { formatDietaryRestrictions } from "../utils/formatDietaryRestrictions.js";
import { getAllUsers, createUser } from "../services/userService.js";

//Get all users
export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();
    if (users.length != 0) {
      return res.json(users);
    } else {
      return res.status(404).json({ error: "No users found" });
    }
  } catch (e) {
    next(e);
  }
};

//Add user
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, name, dietaryRestrictions } = req.body;
    const formattedDietRes = formatDietaryRestrictions(dietaryRestrictions);
    const newUser = await createUser(email, name, formattedDietRes);
    return res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};

//Delete user - 2do
//Update user allergies - 2do
