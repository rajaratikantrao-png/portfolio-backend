import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: "Full Stack Developer" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    about: { type: String, default: "" },
    skills: { type: [String], default: [] },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    image: { type: String, default: "" }, // ← नया: Cloudinary का URL
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);