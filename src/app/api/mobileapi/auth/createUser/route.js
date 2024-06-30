import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, firstName, lastName, username } = await req.json();

  try {
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
      username: username,
    });
    console.log(user);
  } catch (error) {
    console.log("error is here");
    console.log(error.errors);
  }

  return NextResponse.json({ status: "good" }, { status: 200 });
}
