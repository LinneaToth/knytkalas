import mongoose from "mongoose";

export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");

  try {
    await mongoose.connect(uri);
    console.log("Connection established to MongoDB");
  } catch (e) {
    console.error("Connection to DB failed" + e);
  }
};
