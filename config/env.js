import "dotenv/config";

function fail(msg) {
  console.error(`\nConfig error: ${msg}\n`);
  process.exit(1);
}

const env = process.env;

const missing = ["MONGODB_URI", "JWT_SECRET", "ADMIN_PASSWORD"].filter((k) => !env[k]);
if (missing.length) fail(`Missing in .env: ${missing.join(", ")}. See .env.example`);
if (env.MONGODB_URI.includes("USERNAME:PASSWORD")) fail("MONGODB_URI still has the placeholder text. Paste your real Atlas connection string.");
if (env.ADMIN_PASSWORD.length < 8 || env.ADMIN_PASSWORD.startsWith("change-this")) fail("Set a real ADMIN_PASSWORD (at least 8 characters).");
if (env.JWT_SECRET.length < 16 || env.JWT_SECRET.startsWith("change-this")) fail("Set a real JWT_SECRET (a long random string, at least 16 characters).");

export const config = {
  isProd: env.NODE_ENV === "production",
  port: Number(env.PORT) || 5000,
  mongoUri: env.MONGODB_URI,
  clientUrls: (env.CLIENT_URL || "http://localhost:5173").split(",").map((u) => u.trim()).filter(Boolean),
  adminPassword: env.ADMIN_PASSWORD,
  jwtSecret: env.JWT_SECRET,
  smtp: {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 465,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    notifyTo: env.NOTIFY_TO || env.SMTP_USER,
  },
};