import app from "./app.js";
import "dotenv/config";
import { connectToDb } from "./config/db.js";

const PORT = process.env.PORT || 3000;

await connectToDb();

app.listen(PORT, () => {
  console.log(`Currently serving on http://localhost:${PORT}`);
});
