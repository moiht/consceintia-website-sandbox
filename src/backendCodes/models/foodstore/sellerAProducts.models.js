import mongoose from "mongoose";

const sellerAProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orderno: {
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
    seller: {
      type: String,
      required: true,
      enum: ["sellerA", "sellerB"],
    },
    description: {
      type: String,
      required: true,
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

export const SellerAProduct =
  mongoose.models.SellerAProduct ||
  mongoose.model("SellerAProduct", sellerAProductSchema);
