import app from "./app.js";
import "dotenv/config";
import { connectToDb, disconnectFromDb } from "./config/db.js";

const PORT = process.env.PORT || 3000;

try {
  await connectToDb();
  const server = app.listen(PORT, () => {
    console.log(`Currently serving on http://localhost:${PORT}`);
  });

  //No shutdown log received when run on tsx with --watch during dev due to SIGINT caught by it before node does. npx tsx src/server.ts works
  const shutdown = () => {
    server.close(async () => {
      await disconnectFromDb();
      console.log("Server and database connection closed");
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
} catch (e) {
  console.error(e);
  process.exit(1);
}
