import { Schema, model } from "mongoose";
import { TUserRegister } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userRegisterSchema = new Schema<TUserRegister>(
  {
    name: {
      type: String,
      required: true,
    },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
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
      default: "trainee",
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

userRegisterSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userRegisterSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModle = model<TUserRegister>("User", userRegisterSchema);
