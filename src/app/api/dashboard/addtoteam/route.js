import connectDB from "@/backendCodes/db";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { User } from "@/backendCodes/models/user.models";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  if (userId) {
    let dbconn = await connectDB();
    if (dbconn) {
      const cUser = await User.findOne({
        userId: userId,
      });
      let myTeam = [];
      cUser.myTeam.forEach(async (user) => {
        let nUser = await User.findOne({ _id: user });
        myTeam.push(nUser);
      });
      cUser.myTeam = myTeam;
      return NextResponse.json({ user: cUser }, { status: 200 });
    }
  }
}

export async function POST(req) {
  const { userId } = getAuth(req);
  const { friendId } = await req.json();
  if (userId) {
    let dbconn = await connectDB();
    if (dbconn) {
      const nUser = await User.findOne({
        username: friendId,
      });
      console.log(nUser);
      if (!nUser) {
        return NextResponse.json({ msg: "Cannot find user" }, { status: 404 });
      }
      if (nUser.userId != userId) {
        let currUser = await User.findOne({
          userId: userId,
        });
        let prevTeam = currUser.myTeam;
        if (prevTeam.includes(nUser._id)) {
          return NextResponse.json(
            { msg: "User already in team" },
            { status: 200 }
          );
        } else {
          prevTeam.push(nUser);
          const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            { myTeam: prevTeam },
            { new: true }
          );
          nUser.myTeam.push(currUser._id);
          await nUser.save();
          if (updatedUser.myTeam.length > 0) {
            let myTeam = [];
            for (let i = 0; i < updatedUser.myTeam.length; i++) {
              let nUser = await User.findOne({ _id: updatedUser.myTeam[i] });
              myTeam.push(nUser);
            }
            updatedUser.myTeam = myTeam;
          }
          return NextResponse.json(
            { msg: "User added to team", user: updatedUser },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          { msg: "Cannot add yourself to the team" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { msg: "Not able to connect to database" },
        { status: 500 }
      );
    }
  }
}
