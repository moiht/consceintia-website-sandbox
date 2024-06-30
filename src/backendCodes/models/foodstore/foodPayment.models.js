import mongoose from "mongoose";

const foodPaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  updatedTime: {
    type: Date,
    default: Date.now,
  },
  receipt: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    default: "",
  },
  signature: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "created",
    enum: ["created", "paid"],
  },
  items: [],
  razorpayResponse: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const FoodPayment =
  mongoose.models.FoodPayment ||
  mongoose.model("FoodPayment", foodPaymentSchema);
