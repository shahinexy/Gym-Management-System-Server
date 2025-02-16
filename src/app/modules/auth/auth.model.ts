import { Schema, model } from "mongoose";
import { TUserRegister } from "./auth.interface";

const userRegisterSchema = new Schema<TUserRegister>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "trainee", "trainee"],
      default: 'trainee'
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UsersModle = model<TUserRegister>("User", userRegisterSchema);
