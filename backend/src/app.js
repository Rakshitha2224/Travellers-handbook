import express from "express";
import cors from "cors";

import placesRoutes from "./routes/places.routes.js";
import itinerariesRoutes from "./routes/itineraries.routes.js";

const app = express();


app.use(cors());


app.options("*", cors());


app.use(express.json());


app.use("/api/places", placesRoutes);
app.use("/api/itineraries", itinerariesRoutes);

export default app;
