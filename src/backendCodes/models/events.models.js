import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventCategory: [
      {
        type: String,
        required: true,
        enum: [
          "major",
          "robotics",
          "coding",
          "quiz",
          "mysterious",
          "aero",
          "fun",
          "online",
          "bot",
          "business",
          "sports",
          "hackathon",
          "maths",
          "physics",
          "photography",
          "editing",
          "trading",
        ],
      },
    ],
    eventPoster: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ["team", "solo"],
    },
    eventMinTeam: {
      type: Number,
    },
    eventMaxTeam: {
      type: Number,
    },
    eventStartDate: {
      type: Date,
      required: true,
    },
    eventEndDate: {
      type: Date,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventRegistrationLastDate: {
      type: Date,
      required: true,
    },
    eventRegistrationFee: {
      type: Number,
      required: true,
    },
    eventPrize: {
      type: Number,
      required: true,
    },
    eventRules: {
      type: [String],
      required: true,
    },
    eventOrganizers: {
      type: [],
      required: true,
    },
    associatedLinks: {
      type: [],
      required: true,
    },
    eventParticipants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Participants",
        },
      ],
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);
