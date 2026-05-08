import { Router } from "express";
import { getUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);

export { userRouter };
