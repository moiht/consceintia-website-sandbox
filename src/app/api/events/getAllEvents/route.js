import connectDB from "@/backendCodes/db";
import { Event } from "@/backendCodes/models/events.models";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  let { key } = await req.json();
  if (key === process.env.EVENTS_API_KEY) {
    let events = await Event.find();
    if (events.length === 0) {
      return NextResponse.json({ msg: "No events found!" }, { status: 404 });
    } else {
      return NextResponse.json(
        { msg: "Success ", data: events },
        { status: 200 }
      );
    }
  } else {
    return NextResponse.json({ msg: "Invalid key!" }, { status: 401 });
  }
}
