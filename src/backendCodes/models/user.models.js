import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: String,
    lastName: String,
    mobile: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
    },
    profile: {
      type: String,
    },
    college: String,
    collegeId: {
      type: String,
    },
    aadhar: {
      type: Number,
      min: 100000000000,
      max: 999999999999,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: [
        "user",
        "admin",
        "eventAdmin",
        "workshopAdmin",
        "merchAdmin",
        "foodAdmin",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    myTeam: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    foodOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodOrder",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
