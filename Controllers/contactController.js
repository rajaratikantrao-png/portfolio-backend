import mongoose from "mongoose";
import Message from "../models/Message.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { validateContact } from "../utils/validate.js";
import { notifyNewMessage } from "../services/mailer.js";

// POST /api/contact  (public: the contact form on your website)
export const createMessage = asyncHandler(async (req, res) => {
  const { value, error } = validateContact(req.body);
  if (error) return res.status(400).json({ ok: false, message: error });

  await Message.create({ ...value, ip: req.ip });
  notifyNewMessage(value);
  res.status(201).json({ ok: true, message: "Message received" });
});

// GET /api/contact?page=1&limit=20&unread=true  (only you, newest first)
export const listMessages = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const filter = req.query.unread === "true" ? { read: false } : {};

  const [messages, total] = await Promise.all([
    Message.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select("-ip -__v").lean(),
    Message.countDocuments(filter),
  ]);

  res.json({ ok: true, page, limit, total, pages: Math.ceil(total / limit), messages });
});

// PATCH /api/contact/:id/read  body: { "read": true }  (only you)
export const markRead = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid id" });

  const read = req.body?.read !== false; // default: mark as read
  const updated = await Message.findByIdAndUpdate(req.params.id, { read }, { new: true }).select("-ip -__v").lean();
  if (!updated) return res.status(404).json({ ok: false, message: "Message not found" });
  res.json({ ok: true, message: updated });
});

// DELETE /api/contact/:id  (only you)
export const deleteMessage = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid id" });

  const deleted = await Message.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ ok: false, message: "Message not found" });
  res.json({ ok: true });
});
