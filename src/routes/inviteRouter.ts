import { Router } from "express";
import { getInvites } from "../controllers/inviteController.js";

const inviteRouter = Router();

inviteRouter.get("/", getInvites);

export { inviteRouter };
