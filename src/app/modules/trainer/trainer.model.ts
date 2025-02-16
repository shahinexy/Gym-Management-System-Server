import { Schema, model } from "mongoose";
import { TTrainer, TUserName } from "./trainer.interface";

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

const trainerSchema = new Schema<TTrainer>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "trainee", "trainee"],
      default: "trainee",
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
    assignedSchedules: [
      {
        type: Schema.Types.ObjectId,
        ref: "",
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

// virtual
trainerSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName } ${this?.name?.middleName } ${this?.name?.lastName }`;
});

export const TrainerModle = model<TTrainer>("Trainer", trainerSchema);
