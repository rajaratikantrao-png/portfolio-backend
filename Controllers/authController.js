import crypto from "crypto";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/errorHandler.js";
import { config } from "../config/env.js";

// Hash both sides first so timingSafeEqual always compares equal-length values
const hash = (s) => crypto.createHash("sha256").update(String(s)).digest();

// POST /api/auth/login  { "password": "..." }
export const login = asyncHandler(async (req, res) => {
  const given = typeof req.body?.password === "string" ? req.body.password : "";
  const ok = crypto.timingSafeEqual(hash(given), hash(config.adminPassword));
  if (!ok) return res.status(401).json({ ok: false, message: "Wrong password" });

  const token = jwt.sign({ role: "admin" }, config.jwtSecret, { expiresIn: "12h" });
  res.json({ ok: true, token });
});
