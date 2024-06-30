import connectDB from "@/backendCodes/db";
import { NextResponse } from "next/server";
import { Event } from "@/backendCodes/models/events.models";

export async function POST(req) {
  connectDB();
  const { id } = await req.json();
  console.log(id);
  let event = await Event.findOne({ eventId: id });
  console.log(event);
  if (!event) {
    return NextResponse.json({ msg: "Event not found!" }, { status: 404 });
  }
  return NextResponse.json({ msg: "Success ", data: event }, { status: 200 });
}
