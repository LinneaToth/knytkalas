import express from "express";
import { eventRouter } from "./routes/eventRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/events", eventRouter);
//app.use("/api/users", eventRouter);
//app.use("/api/events", eventRouter);

app.use((_, res) => {
  res
    .status(404)
    .json({ error: "Oops! Nothing was found here. Try something else!" });
});

export default app;
