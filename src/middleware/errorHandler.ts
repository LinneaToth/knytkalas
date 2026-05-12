import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import type { MongoServerError } from "mongodb";

const getErrCodeMessage = (err: Error & { statusCode?: number }) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal server error";
  return { statusCode: statusCode, message: message };
};

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isValOrCastErr =
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError;
  //First checking for Mongoose errors
  if (isValOrCastErr) {
    return res.status(400).json({ error: err.message });
  }
  if (
    err instanceof mongoose.Error &&
    (err.cause as MongoServerError)?.code === 11000 //11000 means value is not unique
  ) {
    return res.status(409).json({ error: err.message });
  }

  //Differentiating between environment. If in production, unknown errors aren't sent. If in dev, the entire error will be logged
  const environment = process.env.NODE_ENV || "production";
  if (!err.statusCode && environment === "development") console.error(err);
  const { statusCode, message } = getErrCodeMessage(err);
  return res.status(statusCode).json({ error: message });
};
