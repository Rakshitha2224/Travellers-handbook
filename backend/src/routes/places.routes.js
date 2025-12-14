import express from "express";
import Place from "../models/place.js";

const router = express.Router();

// ✅ CREATE PLACE
router.post("/", async (req, res) => {
  try {
    const { name, state, userId } = req.body;

    const existing = await Place.findOne({ name, state, userId });
    if (existing) {
      return res.status(200).json(existing);
    }

    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET SAVED PLACES
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const places = await Place.find({ userId });
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE PLACE
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
