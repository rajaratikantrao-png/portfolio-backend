import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Check: 1) password in MONGODB_URI  2) Atlas Network Access allows your IP");
    process.exit(1);
  }
}
