import { Schema, model } from "mongoose";
import { TUserRegister, TUserName } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const userRegisterSchema = new Schema<TUserRegister>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    image: { type: String, default: "" },
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
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
userRegisterSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

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

export const TUserModle = model<TUserRegister>("TUser", userRegisterSchema);
