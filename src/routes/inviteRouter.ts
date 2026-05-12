import { Router } from "express";
import {
  getInvites,
  addInvite,
  updateContributions,
  delInvite,
} from "../controllers/inviteController.js";

const inviteRouter = Router();

inviteRouter.get("/", getInvites);

inviteRouter.post("/", addInvite);

inviteRouter.patch("/:id", updateContributions);

inviteRouter.delete("/:id", delInvite);

export { inviteRouter };
