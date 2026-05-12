import { Router } from "express";
import {
  getEvent,
  getEventContributions,
  getEvents,
  searchEvents,
} from "../controllers/eventController.js";

const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.get("/search", searchEvents);
eventRouter.get("/:id", getEvent);
eventRouter.get("/:id/contributions", getEventContributions);

export { eventRouter };
