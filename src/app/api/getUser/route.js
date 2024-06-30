import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@/backendCodes/models/user.models";
import connectDB from "@/backendCodes/db";
import { FoodOrder } from "@/backendCodes/models/foodstore/foodOrders.models";

export async function POST(req) {
  let { userId } = getAuth(req);
  let currUser = await currentUser(req);
  if (!userId) {
    return NextResponse.json({ msg: "Not Authenticated" }, { status: 401 });
  } else {
    let dbconn = await connectDB();
    if (dbconn) {
      let cUser = await User.findOne({ userId });
      if (!cUser) {
        return NextResponse.json({ msg: "No user found" }, { status: 404 });
      } else {
        let myTeam = [];
        if (cUser.myTeam.length > 0) {
          for (let i = 0; i < cUser.myTeam.length; i++) {
            let nUser = await User.findOne({ _id: cUser.myTeam[i] });
            myTeam.push(nUser);
          }
        }
        cUser.myTeam = myTeam;
        let orders = [];
        if (cUser.foodOrders.length > 0) {
          for (let i = 0; i < cUser.foodOrders.length; i++) {
            let fOrder = await FoodOrder.findOne({ _id: cUser.foodOrders[i] });
            orders.push(fOrder);
          }
        }
        cUser.foodOrders = orders;
        return NextResponse.json(
          { msg: "User Found", user: cUser },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json({ msg: "DB Connection Error" }, { status: 500 });
    }
  }
}
