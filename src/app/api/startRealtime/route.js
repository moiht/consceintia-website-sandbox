import connectDB from "@/backendCodes/db";
import { NextResponse } from "next/server";
import { SellerAProduct } from "@/backendCodes/models/foodstore/sellerAProducts.models";
import { SellerBProduct } from "@/backendCodes/models/foodstore/sellerBProducts.models";
export async function GET(req) {
  await connectDB();
  const sellerAProducts = await SellerAProduct.create({
    name: "Burger",
    price: 50,
    category: "Fast Food",
    description: "Enjoy the delicious burger at our store",
    image:
      "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg",
  });
  return NextResponse.json(
    { msg: "Seller A Product Created" },
    { status: 200 }
  );
}
