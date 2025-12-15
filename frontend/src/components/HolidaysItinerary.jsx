import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { motion as Motion } from "framer-motion";
import toast from "react-hot-toast";

import WeatherCard from "./WeatherCard";
import ItineraryModal from "./ItineraryModal";
import { savePlace } from "../services/placesApi";
import { useAuth } from "../context/useAuth";

/* ---------- IMAGE HELPER ---------- */
const img = (name) => `/images/${name}`;

/* ---------- DATA ---------- */
const DATA = {
  Telangana: {
    places: [
      { name: "Charminar", img: img("charminar.jpg"), desc: "Historic monument", map: "https://maps.google.com?q=Charminar" },
      { name: "Golconda Fort", img: img("golconda-fort.jpg"), desc: "Ancient fortress", map: "https://maps.google.com?q=Golconda+Fort" },
      { name: "Ramoji Film City", img: img("ramoji-film-city.jpg"), desc: "Film studio", map: "https://maps.google.com?q=Ramoji+Film+City" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Charminar", "Laad Bazaar"] },
      { day: "Day 2", activities: ["Golconda Fort"] },
      { day: "Day 3", activities: ["Ramoji Film City"] },
    ],
  },

  "Tamil Nadu": {
    places: [
      { name: "Kanyakumari", img: img("kanyakumari.jpg"), desc: "Southern tip of India", map: "https://maps.google.com?q=Kanyakumari" },
      { name: "Ooty", img: img("ooty.jpg"), desc: "Hill station", map: "https://maps.google.com?q=Ooty" },
      { name: "Kodaikanal", img: img("kodaikanal.jpg"), desc: "Misty hills", map: "https://maps.google.com?q=Kodaikanal" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Kanyakumari"] },
      { day: "Day 2", activities: ["Ooty"] },
      { day: "Day 3", activities: ["Kodaikanal"] },
    ],
  },

  Karnataka: {
    places: [
      { name: "Netravathi Hills", img: img("netravathi-hills.jpg"), desc: "Scenic hills", map: "https://maps.google.com?q=Netravathi+Hills" },
      { name: "Nandi Hills", img: img("nandi-hills.jpg"), desc: "Sunrise point", map: "https://maps.google.com?q=Nandi+Hills" },
      { name: "Hampi", img: img("hampi.jpg"), desc: "UNESCO site", map: "https://maps.google.com?q=Hampi" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Netravathi Hills"] },
      { day: "Day 2", activities: ["Nandi Hills"] },
      { day: "Day 3", activities: ["Hampi"] },
    ],
  },

  Maharashtra: {
    places: [
      { name: "Ellora Caves", img: img("ellora-caves.jpg"), desc: "Rock-cut caves", map: "https://maps.google.com?q=Ellora+Caves" },
      { name: "Lonavala", img: img("lonavala.jpg"), desc: "Hill station", map: "https://maps.google.com?q=Lonavala" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Ellora Caves"] },
      { day: "Day 2", activities: ["Lonavala"] },
    ],
  },

  "Uttar Pradesh": {
    places: [
      { name: "Taj Mahal", img: img("taj-mahal.jpg"), desc: "Symbol of love", map: "https://maps.google.com?q=Taj+Mahal" },
      { name: "Varanasi", img: img("varanasi.jpg"), desc: "Spiritual city", map: "https://maps.google.com?q=Varanasi" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Taj Mahal"] },
      { day: "Day 2", activities: ["Varanasi Ghats"] },
    ],
  },

  Delhi: {
    places: [
      { name: "Red Fort", img: img("red-fort.jpg"), desc: "Mughal fort", map: "https://maps.google.com?q=Red+Fort" },
      { name: "India Gate", img: img("india-gate.jpg"), desc: "War memorial", map: "https://maps.google.com?q=India+Gate" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Red Fort"] },
      { day: "Day 2", activities: ["India Gate"] },
    ],
  },

  Kerala: {
    places: [
      { name: "Alleppey", img: img("alleppey.jpg"), desc: "Backwaters", map: "https://maps.google.com?q=Alleppey" },
      { name: "Munnar", img: img("munnar.jpg"), desc: "Tea gardens", map: "https://maps.google.com?q=Munnar" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Alleppey"] },
      { day: "Day 2", activities: ["Munnar"] },
    ],
  },

  Goa: {
    places: [
      { name: "Dudhsagar Falls", img: img("dudhsagar-goa.jpg"), desc: "Waterfall", map: "https://maps.google.com?q=Dudhsagar" },
      { name: "Aguada Fort", img: img("aguada-fort.jpg"), desc: "Portuguese fort", map: "https://maps.google.com?q=Aguada+Fort" },
      { name: "Salaulim Dam", img: img("salaulim-dam-goa.jpg"), desc: "Scenic dam", map: "https://maps.google.com?q=Salaulim+Dam" },
    ],
    itinerary: [
      { day: "Day 1", activities: ["Dudhsagar Falls"] },
      { day: "Day 2", activities: ["Aguada Fort"] },
      { day: "Day 3", activities: ["Salaulim Dam"] },
    ],
  },
};

/* ---------- HELPERS ---------- */
const fetcher = (url) => fetch(url).then((r) => r.json());
const placeKey = (state, name) => `${state}-${name}`;

/* ---------- COMPONENT ---------- */
export default function HolidaysItinerary() {
  const { user, loading } = useAuth();

  const [state, setState] = useState(
    () => localStorage.getItem("selectedState") || ""
  );

  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  /* sync itinerary when state changes */
  useEffect(() => {
    if (!state) {
      setItinerary([]);
      setItineraryOpen(false);
    } else {
      setItinerary(DATA[state]?.itinerary || []);
    }
    localStorage.setItem("selectedState", state);
  }, [state]);

  const places = DATA[state]?.places || [];

  const cityForWeather = {
    Telangana: "Hyderabad",
    "Tamil Nadu": "Chennai",
    Karnataka: "Bengaluru",
    Maharashtra: "Mumbai",
    "Uttar Pradesh": "Agra",
    Delhi: "Delhi",
    Kerala: "Kochi",
    Goa: "Panaji",
  }[state];

  const savedKey =
    !loading && user?.uid ? `/api/places?userId=${user.uid}` : null;

  const { data: savedPlaces = [], mutate } = useSWR(savedKey, fetcher);

  const savedSet = useMemo(
    () => new Set(savedPlaces.map((p) => placeKey(p.state, p.name))),
    [savedPlaces]
  );

  const handleSave = async (place) => {
    if (!user || savedSet.has(placeKey(state, place.name))) return;

    const payload = {
      name: place.name,
      state,
      description: place.desc,
      image: place.img,
    };

    mutate((c = []) => [...c, payload], { revalidate: false });

    try {
      await savePlace(payload, user.uid);
      mutate();
    } catch {
      mutate();
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="page-bg holidays-bg">
      <main className="page-container holidays-page">
        <h2 className="page-title">Holidays & Itinerary</h2>

        <div className="controls-row">
          <div className="left-controls">
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">-- Choose state --</option>
              {Object.keys(DATA).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {itinerary.length > 0 && (
              <button
                className="itinerary-btn"
                onClick={() => setItineraryOpen(true)}
              >
                View {itinerary.length}-Day Itinerary
              </button>
            )}
          </div>

          {state && cityForWeather && (
            <div className="weather-side">
              <WeatherCard city={cityForWeather} />
            </div>
          )}
        </div>

       {/* -------- EMPTY STATE BACKGROUND -------- */}
{!state && (
  <Motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={{
      textAlign: "center",
      marginTop: 40,
      color: "#475569",
    }}
  >
    <img
      src="/images/select-state.png"
      alt="Select a state"
      style={{
        width: 220,
        marginBottom: 12,
        opacity: 0.9,
      }}
    />
    <h3 style={{ margin: 0 }}>
      Select a state and start planning your trip ✨
    </h3>
    <p style={{ marginTop: 6 }}>
      Explore places, weather, and itinerary suggestions
    </p>
  </Motion.div>
)}

{/* -------- PLACES GRID -------- */}
<div className="grid-3">
  {places.map((p) => {
    const saved = savedSet.has(placeKey(state, p.name));

    return (
      <Motion.div
        key={p.name}
        className="card"
        whileHover={{ scale: 1.02 }}
      >
        <div className="image-wrap">
          <img src={p.img} alt={p.name} />
        </div>

        <div className="card-body">
          <h4 className="card-title">{p.name}</h4>
          <p className="card-desc">{p.desc}</p>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => window.open(p.map, "_blank")}>
              Map
            </button>

            <button
              disabled={saved}
              onClick={() =>
                !user
                  ? toast.error("Sign in to save places")
                  : handleSave(p)
              }
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </Motion.div>
    );
  })}
</div>


        <ItineraryModal
          open={itineraryOpen}
          onClose={() => setItineraryOpen(false)}
          state={state}
          places={places}
          itinerary={itinerary}
          user={user}
          onDeleteDay={(dayId) => {
            setItinerary((prev) =>
              prev
                .filter((d) => d.day !== dayId)
                .map((d, i) => ({ ...d, day: `Day ${i + 1}` }))
            );
          }}
          onReorderDays={(reordered) => {
            setItinerary(
              reordered.map((d, i) => ({ ...d, day: `Day ${i + 1}` }))
            );
          }}
        />
      </main>
    </div>
  );
}
