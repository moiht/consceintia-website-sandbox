import mongoose from "mongoose";

const foodOrdersSchema = new mongoose.Schema(
  {
    orderno: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerDetail",
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "preparing", "delivered"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPayment",
    },
  },
  { timestamps: true }
);

export const FoodOrder =
  mongoose.models.FoodOrder || mongoose.model("FoodOrder", foodOrdersSchema);
