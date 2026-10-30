import nodemailer from "nodemailer";
import { config } from "../config/env.js";

const { host, port, user, pass, notifyTo } = config.smtp;
const enabled = Boolean(host && user && pass);

const transporter = enabled
  ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  : null;

if (!enabled) console.log("Email notifications are off (SMTP_* not set in .env)");

// Fire and forget: if email fails, the visitor's message is still saved.
export function notifyNewMessage({ name, email, message }) {
  if (!enabled) return;
  transporter
    .sendMail({
      from: `"Portfolio" <${user}>`,
      to: notifyTo,
      replyTo: email, // press Reply in Gmail to answer the visitor directly
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
    .catch((err) => console.error("Email notification failed:", err.message));
}
