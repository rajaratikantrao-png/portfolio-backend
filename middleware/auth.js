import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

// Protects routes that only you should use (reading and managing messages)
export default function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, message: "Login required" });

  try {
    req.admin = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    res.status(401).json({ ok: false, message: "Session expired. Please log in again." });
  }
}
