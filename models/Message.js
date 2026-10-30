import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    read: { type: Boolean, default: false },
    ip: { type: String },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

messageSchema.index({ createdAt: -1 });

export default mongoose.model("Message", messageSchema);
