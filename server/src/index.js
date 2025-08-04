import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";

import path from "path";

dotenv.config();
const app = express();
const server = createServer(app);

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.CLIENT_URL, "https://chatto-app.onrender.com"]
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

const io = new Server(server, {
  cors: corsOptions,
});

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));

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

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const onlineUsers = new Map(); // socketId -> userId
const userSockets = new Map(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("user_connected", (userId) => {
    onlineUsers.set(socket.id, userId);
    userSockets.set(userId, socket.id);

    socket.broadcast.emit("user_online", userId);

    const onlineUserIds = Array.from(onlineUsers.values());
    io.emit("online_users", onlineUserIds);

    console.log(
      `User ${userId} connected. Total online: ${onlineUserIds.length}`
    );
  });

  socket.on("send_message", (data) => {
    const { message, receiverId } = data;
    const senderId = onlineUsers.get(socket.id);

    if (senderId && receiverId) {
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_message", {
          message,
          senderId,
          receiverId,
        });
      }

      socket.emit("new_message", {
        message,
        senderId,
        receiverId,
      });
    }
  });

  socket.on("typing_start", (data) => {
    const { userId } = data;
    const receiverSocketId = userSockets.get(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_typing", {
        userId: onlineUsers.get(socket.id),
      });
    }
  });

  socket.on("typing_stop", (data) => {
    const { userId } = data;
    const receiverSocketId = userSockets.get(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_stop_typing", {
        userId: onlineUsers.get(socket.id),
      });
    }
  });

  socket.on("disconnect", () => {
    const userId = onlineUsers.get(socket.id);
    if (userId) {
      onlineUsers.delete(socket.id);
      userSockets.delete(userId);

      socket.broadcast.emit("user_offline", userId);

      const onlineUserIds = Array.from(onlineUsers.values());
      io.emit("online_users", onlineUserIds);

      console.log(
        `User ${userId} disconnected. Total online: ${onlineUserIds.length}`
      );
    }
    console.log("User disconnected:", socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Visit => http://localhost:${PORT}`);
  connectDB();
});
