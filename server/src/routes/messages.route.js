import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
  getAllMessages,
  markMessageAsRead,
  markAllMessagesAsRead,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/all", protectRoute, getAllMessages);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.put("/:messageId/read", protectRoute, markMessageAsRead);
router.put("/:userId/read-all", protectRoute, markAllMessagesAsRead);

export default router;
