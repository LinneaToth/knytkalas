import mongoose from "mongoose";

export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");

  try {
    mongoose.set("strictQuery", true); //only allow schema fields in search & saves
    await mongoose.connect(uri);
    console.log("Connection established to MongoDB");
  } catch (e) {
    console.error("Connection to database failed");
    throw e; //re-throw the error to let server.ts deal with it
  }
};
