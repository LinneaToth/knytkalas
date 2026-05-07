import { type Request, type Response, type NextFunction } from "express";
import Event from "../models/eventSchema.js";

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    //look for search params, if there is a host=<id> it should return all events by that particular host

    if (req.params["host"]) {
      console.log(req.params["host"] + " was what you wanted yeah? ")
      res.json({hostID: req.params["host"]})
    }
  try{
    const events = await Event.find();
    if(!events) {
      res.status(404).json({error: "No events found"})
    }
    res.json(events);
  } catch (e){
    next(e); //e is forwarderd to the error handling function in app
  }

};

export const getEvent = (req: Request, res: Response, next: NextFunction) => {
  //look up particular event by ID
  res.json({
    Hello: `You wanted a specific event, eventually you'll get one here`,
  });
};
