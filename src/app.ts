import express from "express";
import { eventRouter } from "./routes/eventRouter.js";
import { inviteRouter } from "./routes/inviteRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/events", eventRouter);
app.use("/api/invites", inviteRouter);
app.use("/api/users", userRouter);

app.use((_, res) => {
  res.status(404).json({
    error: "This I don't know. Try something else!",
  });
});

app.use(errorHandler);

export default app;
