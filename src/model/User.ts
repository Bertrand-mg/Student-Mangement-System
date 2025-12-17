import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "student"],
    },
    password: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
