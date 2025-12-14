import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    userId: {
      type: String, // Google UID
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
