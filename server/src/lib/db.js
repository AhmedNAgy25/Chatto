import mongoose from "mongoose";
import dotenv, { config } from "dotenv"
dotenv.config()

export const connectDB = async () => {
  try {
    const conn=await mongoose.connect(process.env.MONGODB_URI)
    console.error(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`MongoDB connection error:${error}`);
  }
};
