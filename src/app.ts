import express from "express";
import { eventRouter } from "./routes/eventRoutes.js";
import { inviteRouter } from "./routes/inviteRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();

app.use(express.json());

app.use("/api/events", eventRouter);
app.use("/api/invites", inviteRouter);
app.use("/api/users", userRouter);

app.use((_, res) => {
  res
    .status(404)
    .json({ error: "Oops! Nothing was found here. Try something else!" });
});

//ERROR HANDLING FUNCTION MISSING

export default app;
