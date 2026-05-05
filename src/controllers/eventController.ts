import { type Request, type Response, type NextFunction } from "express";
import Event from "../models/eventSchema.js";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  res.json({ Hello: "FROM GET EVENTS WOHOO" });
  //look for search params, if there is a host=<id> it should return all events by that particular host
};

export const getEvent = (req: Request, res: Response, next: NextFunction) => {
  //look up particular event by ID
  res.json({
    Hello: `You wanted a specific event, eventually you'll get one here`,
  });
};
