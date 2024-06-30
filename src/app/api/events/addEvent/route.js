import { NextResponse } from "next/server";
import connectDB from "@/backendCodes/db";
import { Event } from "@/backendCodes/models/events.models";

export async function POST(req) {
  let eventData = await req.json();
  await connectDB();

  let prevEvent = await Event.find({ eventName: eventData.eventName });
  if (prevEvent.length > 0) {
    return NextResponse.json({
      status: 400,
      body: { msg: "Event Already Exists" },
    });
  }
  prevEvent = await Event.find({});
  let eventId = `event#${prevEvent.length + 1}`;
  let sDate = new Date(eventData.startDate + " " + eventData.startTime);
  let eDate = new Date(eventData.endDate + " " + eventData.endTime);
  let lDate = new Date(eventData.regLastDate + " " + "23:59:59");
  if (
    sDate.getTime() > eDate.getTime() ||
    lDate.getTime() > sDate.getTime() ||
    lDate.getTime() > eDate.getTime()
  ) {
    return NextResponse.json({
      status: 400,
      body: { msg: "Invalid Date or Time" },
    });
  }
  console.log(sDate.getTime(), lDate.getTime(), eDate.getTime());
  const newEvent = new Event({
    eventId: eventId,
    eventName: eventData.eventName,
    eventCategory: eventData.eventCat,
    eventPoster: eventData.eventPoster,
    eventType: eventData.eventType,
    eventMinTeam: eventData.teamMin,
    eventMaxTeam: eventData.teamMax,
    eventStartDate: sDate.getTime(),
    eventEndDate: eDate.getTime(),
    eventVenue: eventData.eventVenue,
    eventRegistrationLastDate: lDate.getTime(),
    eventRegistrationFee: eventData.eventRegistrationFee,
    eventPrize: eventData.eventPrize,
    eventRules: eventData.eventRules,
    eventOrganizers: eventData.eventOrganisers,
    associatedLinks: eventData.eventLinks,
    eventParticipants: [],
    eventDescription: eventData.eventDescription,
  });
  await newEvent.save();
  let checkEvent = await Event.find({ eventId: eventId });
  if (checkEvent.length === 0) {
    return NextResponse.json({
      status: 500,
      body: { msg: "Server Error. Event Not Added" },
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: { msg: "Event Added Successfully" },
    });
  }
}
