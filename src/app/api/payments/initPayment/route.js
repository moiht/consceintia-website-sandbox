import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { FoodPayment } from "@/backendCodes/models/foodstore/foodPayment.models";
import connectDB from "@/backendCodes/db";
import { User } from "@/backendCodes/models/user.models";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  const { amount, receipt, user, items } = await req.json();
  console.log(amount);
  await connectDB();

  const options = {
    amount: amount,
    currency: "INR",
    receipt,
  };

  try {
    const response = await instance.orders.create(options);
    console.log("Order created successfully", response);
    await FoodPayment.create({
      amount: amount / 100,
      updatedTime: response.created_at,
      status: response.status,
      receipt: receipt,
      orderId: response.id,
      razorpayResponse: response,
      user: user._id,
      items: items,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("Error in creating order", error);
    return NextResponse.json(
      { message: "Problem in processing payments." },
      { status: 500 }
    );
  }
}
