import mongoose from "mongoose";

const sellerAOrdersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerA",
    },
    item: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "preparing", "delivered"],
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

export const SellerAOrders =
  mongoose.models.SellerAOrders ||
  mongoose.model("SellerAOrders", sellerAOrdersSchema);
