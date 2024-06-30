import connectDB from "@/backendCodes/db";
import { FoodPayment } from "@/backendCodes/models/foodstore/foodPayment.models";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { pid, oid, signature } = await req.json();
  await connectDB();
  const cryptoObj = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  let generatedSign = cryptoObj.update(oid + "|" + pid).digest("hex");
  if (generatedSign === signature) {
    let doc = await FoodPayment.findOneAndUpdate(
      {
        orderId: oid,
      },
      {
        paymentId: pid,
        signature: generatedSign,
        status: "paid",
      }
    );
    console.log(doc);
    return NextResponse.json(
      { message: "Payment verified", id: doc._id },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Payment not verified" },
    { status: 400 }
  );
}
