import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);

export { userRouter };
