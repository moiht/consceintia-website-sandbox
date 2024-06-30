import connectDB from "@/backendCodes/db";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { User } from "@/backendCodes/models/user.models";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = getAuth(req);
  const { friendId } = await req.json();
  if (userId) {
    let dbconn = await connectDB();
    if (dbconn) {
      const nUser = await User.findOne({
        username: friendId,
      });
      if (nUser) {
        let currUser = await User.findOne({ userId: userId });
        let prevTeam = currUser.myTeam;
        let newTeam = prevTeam.filter((user) => {
          return !user.equals(nUser._id);
        });
        const updatedUser = await User.findOneAndUpdate(
          { userId: userId },
          { myTeam: newTeam },
          { new: true }
        );
        nUser.myTeam = nUser.myTeam.filter((user) => {
          return !user.equals(currUser._id);
        });
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
          { msg: "User removed from team", user: updatedUser },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ msg: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ msg: "DB Connection Error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ msg: "Not Authenticated" }, { status: 401 });
  }
}
