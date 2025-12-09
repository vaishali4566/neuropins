import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatarUrl: String,
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
export default mongoose.models.User || mongoose.model("User", UserSchema);
