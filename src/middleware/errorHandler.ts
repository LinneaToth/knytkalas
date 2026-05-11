import { type Request, type Response, type NextFunction } from "express";

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  const statusCode = err.statusCode ?? 500;
  if (!err.statusCode) console.error(err);

  res.status(statusCode).json({ error: err.message });
};
