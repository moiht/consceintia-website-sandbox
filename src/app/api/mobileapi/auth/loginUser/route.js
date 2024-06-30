import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, password } = await req.json();
  const response = await clerkClient.users.verifyPassword({
    userId,
    password,
  });
  console.log(response);
  return NextResponse.json({ response }, { status: 200 });
}
