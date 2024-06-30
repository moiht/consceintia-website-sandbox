import connectDB from "@/backendCodes/db";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@/backendCodes/models/user.models";

export async function POST(req) {
  const { userId } = getAuth(req);
  const currUser = await currentUser(req);
  console.log(currUser);
  if (currUser) {
    let dbconn = await connectDB();
    if (dbconn) {
      const cUser = await User.findOne({
        userId: userId,
      });
      if (!cUser) {
        const newUser = await User.create({
          userId,
          username: currUser.username,
          email: currUser.emailAddresses[0].emailAddress,
          role: "user",
          profile: currUser.imageUrl,
          firstName: currUser.firstName,
          lastName: currUser.lastName,
          mobile: null,
          college: null,
          collegeId: null,
          aadhar: null,
          registreredEvents: [],
          myTeam: [],
        });

        const createdUser = await User.findById(newUser._id);
        if (!createdUser) {
          return NextResponse.json(
            { msg: "User not created" },
            { status: 500 }
          );
        } else {
          return NextResponse.json(
            { msg: "User Created", user: createdUser },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          { msg: "User already exists", user: cUser },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { msg: "Not able to connect to database" },
        { status: 500 }
      );
    }
  } else {
    console.log("Null chala");
    return NextResponse.json({ msg: "Error" }, { status: 401 });
  }
}
