import User from "../models/user.js";
import type { DietaryRestrictions } from "../types/types.js";

export const getAllUsers = async () => await User.find();

export const createUser = async (
  email: string,
  name: string,
  dietaryRestrictions: DietaryRestrictions,
) => {
  return await User.create({
    email: email,
    name: name,
    dietaryRestrictions: dietaryRestrictions,
  });
};
