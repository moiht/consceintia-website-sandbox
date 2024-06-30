import connectDB from "@/backendCodes/db";
import { User } from "@/backendCodes/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  let { userId } = getAuth(req);

  let params = await req.json();

  let dbconn = await connectDB();

  if (dbconn) {
    let user = await User.findOneAndUpdate({ userId }, params);

    let nUser = await User.findOne({ userId });

    if (!nUser) {
      return NextResponse.json({ msg: "User not updated" }, { status: 500 });
    } else {
      return NextResponse.json(nUser, { status: 200 });
    }
  } else {
    return NextResponse.json(
      { msg: "Not able to connect to database" },
      { status: 500 }
    );
  }
}
