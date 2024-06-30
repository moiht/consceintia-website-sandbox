import connectDB from "@/backendCodes/db";
import { SellerAProduct } from "@/backendCodes/models/foodstore/sellerAProducts.models";
import { SellerBProduct } from "@/backendCodes/models/foodstore/sellerBProducts.models";
import { NextResponse } from "next/server";

export async function POST(req) {
  let { seller } = await req.json();
  await connectDB();
  if (seller === "sellerA") {
    let data = await SellerAProduct.find({});
    return NextResponse.json({ data: data }, { status: 200 });
  } else if (seller === "sellerB") {
    let data = await SellerBProduct.find({});
    return NextResponse.json({ data: data }, { status: 200 });
  }
}
