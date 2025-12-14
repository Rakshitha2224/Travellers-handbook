import express from "express";
import Itinerary from "../models/Itinerary.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/", requireAuth, async (req, res) => {
  const itinerary = await Itinerary.create({
    ...req.body,
    userId: req.userId
  });
  res.status(201).json(itinerary);
});

// READ
router.get("/", requireAuth, async (req, res) => {
  const data = await Itinerary.find({ userId: req.userId });
  res.json(data);
});

// UPDATE
router.put("/:id", requireAuth, async (req, res) => {
  const updated = await Itinerary.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", requireAuth, async (req, res) => {
  await Itinerary.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
