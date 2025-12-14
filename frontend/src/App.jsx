import { Routes, Route } from "react-router-dom";
import SavedPlaces from "./components/SavedPlaces";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

import Home from "./components/Home";
import Arts from "./components/Arts";
import Festivals from "./components/Festivals";
import Holidays from "./components/HolidaysItinerary";

export default function App() {
  return (
  <>
  <NavBar />
  <Toaster position="top-center" reverseOrder={false} />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/arts" element={<Arts />} />
    <Route path="/festivals" element={<Festivals />} />
    <Route path="/holidays" element={<Holidays />} />
    <Route path="/saved" element={<SavedPlaces />} />
  </Routes>
</>
  )}
