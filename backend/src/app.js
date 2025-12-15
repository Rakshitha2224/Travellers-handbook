import express from "express";
import cors from "cors";
import { join } from "path";

import placesRoutes from "./routes/places.routes.js";
import itinerariesRoutes from "./routes/itineraries.routes.js";

const app = express();

// Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());

// API routes
app.use("/api/places", placesRoutes);
app.use("/api/itineraries", itinerariesRoutes);

app.use(
  express.static(join(import.meta.dirname, "..", "dist"))
);

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(
    join(import.meta.dirname, "..", "dist", "index.html")
  );
});

export default app;
