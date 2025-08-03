import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

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
    
    console.log(`User ${userId} connected. Total online: ${onlineUserIds.length}`);
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
          receiverId
        });
      }
      
      socket.emit("new_message", {
        message,
        senderId,
        receiverId
      });
    }
  });

  socket.on("typing_start", (data) => {
    const { userId } = data;
    const receiverSocketId = userSockets.get(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_typing", {
        userId: onlineUsers.get(socket.id)
      });
    }
  });

  socket.on("typing_stop", (data) => {
    const { userId } = data;
    const receiverSocketId = userSockets.get(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_stop_typing", {
        userId: onlineUsers.get(socket.id)
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
      
      console.log(`User ${userId} disconnected. Total online: ${onlineUserIds.length}`);
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`visit => http://localhost:${PORT}`);
  connectDB();
});
