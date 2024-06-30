import mongoose from "mongoose";

const sellerBProductSchema = new mongoose.Schema(
  {
    orderno: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
      enum: ["sellerA", "sellerB"],
    },
    image: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const SellerBProduct =
  mongoose.models.SellerBProduct ||
  mongoose.model("SellerBProduct", sellerBProductSchema);
