import { Router } from "express";
import { getEvent, getEvents } from "../controllers/eventController.js";

const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEvent);

export { eventRouter };
