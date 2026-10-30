import { Router } from "express";
import rateLimit from "express-rate-limit";
import requireAuth from "../middleware/auth.js";
import { createMessage, listMessages, markRead, deleteMessage } from "../controllers/contactController.js";

const router = Router();

// Stops spam: max 5 messages per IP every 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages from your network. Please try again in a few minutes." },
});

router.post("/", contactLimiter, createMessage);
router.get("/", requireAuth, listMessages);
router.patch("/:id/read", requireAuth, markRead);
router.delete("/:id", requireAuth, deleteMessage);

export default router;
