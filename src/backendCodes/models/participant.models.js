import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  participantId: {
    type: String,
    required: true,
    unique: true,
  },
  participantName: {
    type: String,
    required: true,
    trim: true,
  },
  participantMembers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  participantEvents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "unpaid",
    enum: ["paid", "unpaid"],
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
  },
});

export const Participant =
  mongoose.models.Participant ||
  mongoose.model("Participant", participantSchema);
