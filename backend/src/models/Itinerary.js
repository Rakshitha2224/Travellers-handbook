import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    state: { type: String, required: true },
    days: [
      {
        day: String,
        activities: [String],
        hotel: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);
