import { Schema, model } from "mongoose";
import { TUserName, TTrainee } from "./trainee.interface";

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

const traineeSchema = new Schema<TTrainee>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    age: { type: Number, required: true },
    image: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: {
      type: String,
      unique: true,
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
traineeSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

export const TraineeModle = model<TTrainee>("Trainee", traineeSchema);
