import { Router } from "express";
import {
  getInvites,
  addInvite,
  updateContributions,
} from "../controllers/inviteController.js";

const inviteRouter = Router();

inviteRouter.get("/", getInvites);

inviteRouter.post("/", addInvite);

inviteRouter.patch("/edit-contributions", updateContributions);

export { inviteRouter };
