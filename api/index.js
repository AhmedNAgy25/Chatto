import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "../server/src/lib/db.js";
import authRoutes from "../server/src/routes/auth.route.js";
import messageRoutes from "../server/src/routes/messages.route.js";

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://chatto-app.vercel.app", "https://chatto.vercel.app"]
      : ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Connect to database
connectDB();

// Export for Vercel
export default app;
