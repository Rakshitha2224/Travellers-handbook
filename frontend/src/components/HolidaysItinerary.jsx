import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { motion as Motion } from "framer-motion";
import toast from "react-hot-toast";

import WeatherCard from "./WeatherCard";
import ItineraryModal from "./ItineraryModal";
import { savePlace } from "../services/placesApi";
import { useAuth } from "../context/useAuth";


/* ---------- IMAGES ---------- */
const IMAGES = {
  "Charminar.jpg": new URL("../assets/project images/Charminar.jpg", import.meta.url).href,
  "Golconda fort.jpg": new URL("../assets/project images/Golconda fort.jpg", import.meta.url).href,
  "Ramoji film city.jpg": new URL("../assets/project images/Ramoji film city.jpg", import.meta.url).href,

  "Kanyakumari.jpg": new URL("../assets/project images/Kanyakumari.jpg", import.meta.url).href,
  "Ooty.jpg": new URL("../assets/project images/Ooty.jpg", import.meta.url).href,
  "Kodaikanal.jpg": new URL("../assets/project images/Kodaikanal.jpg", import.meta.url).href,

  "Netravathi hills.jpg": new URL("../assets/project images/Netravathi hills.jpg", import.meta.url).href,
  "Nandi hills.jpg": new URL("../assets/project images/Nandi hills.jpg", import.meta.url).href,
  "Hampi.jpg": new URL("../assets/project images/Hampi.jpg", import.meta.url).href,

  "Ellora caves.jpg": new URL("../assets/project images/Ellora caves.jpg", import.meta.url).href,
  "Lonavala.jpg": new URL("../assets/project images/Lonavala.jpg", import.meta.url).href,

  "Taj mahal.jpg": new URL("../assets/project images/Taj mahal.jpg", import.meta.url).href,
  "Varanasi.jpg": new URL("../assets/project images/Varanasi.jpg", import.meta.url).href,

  "Red fort.jpg": new URL("../assets/project images/Red fort.jpg", import.meta.url).href,
  "India Gate.jpg": new URL("../assets/project images/India Gate.jpg", import.meta.url).href,

  "Alleppey.jpg": new URL("../assets/project images/Alleppey.jpg", import.meta.url).href,
    "Munnar.jpg": new URL("../assets/project images/Munnar.jpg", import.meta.url).href,

  "Salaulim Dam Goa.jpg": new URL("../assets/project images/Salaulim Dam Goa.jpg", import.meta.url).href,
  "Dudhsagar Goa.jpg": new URL("../assets/project images/Dudhsagar Goa.jpg", import.meta.url).href,
  "Aguada fort.jpg": new URL("../assets/project images/Aguada fort.jpg", import.meta.url).href,
};

const imgFor = (f) => IMAGES[f] || "";

/* ---------- DATA ---------- */
const DATA = {
  Telangana: {
    places: [
      { name: "Charminar", img: imgFor("Charminar.jpg"), desc: "Historic monument in Hyderabad", map: "https://maps.google.com?q=Charminar" },
      { name: "Golconda Fort", img: imgFor("Golconda fort.jpg"), desc: "Ancient fortress", map: "https://maps.google.com?q=Golconda+Fort" },
      { name: "Ramoji Film City", img: imgFor("Ramoji film city.jpg"), desc: "World’s largest film studio", map: "https://maps.google.com?q=Ramoji+Film+City" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Charminar", "Laad Bazaar"],
        hotel: {
          name: "Taj Falaknuma Palace",
          link: "https://www.google.com/maps/search/?api=1&query=Taj+Falaknuma+Palace+Hyderabad"
        }
      },
      {
        day: "Day 2",
        activities: ["Golconda Fort", "Qutb Shahi Tombs"],
        hotel: {
          name: "ITC Kohenur",
          link: "https://www.google.com/maps/search/?api=1&query=ITC+Kohenur+Hyderabad"
        }
      },
      {
        day: "Day 3",
        activities: ["Ramoji Film City"],
        hotel: {
          name: "Sitara Luxury Hotel – Ramoji Film City",
          link: "https://www.google.com/maps/search/?api=1&query=Sitara+Luxury+Hotel+Ramoji+Film+City"
        }
      }
    ]
  },

  "Tamil Nadu": {
    places: [
      { name: "Kanyakumari", img: imgFor("Kanyakumari.jpg"), desc: "Southern tip of India", map: "https://maps.google.com?q=Kanyakumari" },
      { name: "Ooty", img: imgFor("Ooty.jpg"), desc: "Hill station", map: "https://maps.google.com?q=Ooty" },
      { name: "Kodaikanal", img: imgFor("Kodaikanal.jpg"), desc: "Misty hills", map: "https://maps.google.com?q=Kodaikanal" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Kanyakumari sunrise"],
        hotel: {
          name: "The Seashore Hotel, Kanyakumari",
          link: "https://www.google.com/maps/search/?api=1&query=The+Seashore+Hotel+Kanyakumari"
        }
      },
      {
        day: "Day 2",
        activities: ["Ooty Botanical Gardens"],
        hotel: {
          name: "Savoy, Ooty – IHCL SeleQtions",
          link: "https://www.google.com/maps/search/?api=1&query=Savoy+Hotel+Ooty"
        }
      },
      {
        day: "Day 3",
        activities: ["Kodaikanal Lake"],
        hotel: {
          name: "The Carlton, Kodaikanal",
          link: "https://www.google.com/maps/search/?api=1&query=The+Carlton+Kodaikanal"
        }
      }
    ]
  },

  Karnataka: {
    places: [
      { name: "Netravathi Hills", img: imgFor("Netravathi hills.jpg"), desc: "Scenic hills", map: "https://maps.google.com?q=Netravathi+Hills" },
      { name: "Nandi Hills", img: imgFor("Nandi hills.jpg"), desc: "Sunrise viewpoint", map: "https://maps.google.com?q=Nandi+Hills" },
      { name: "Hampi", img: imgFor("Hampi.jpg"), desc: "UNESCO heritage site", map: "https://maps.google.com?q=Hampi" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Netravathi Hills"],
        hotel: {
          name: "Paradise Wild Hills Resort",
          link: "https://www.google.com/maps/search/?api=1&query=Paradise+Wild+Hills+Resort+Karnataka"
        }
      },
      {
        day: "Day 2",
        activities: ["Nandi Hills"],
        hotel: {
          name: "Mulberry Shades Bengaluru – Nandi Hills",
          link: "https://www.google.com/maps/search/?api=1&query=Mulberry+Shades+Bengaluru+Nandi+Hills"
        }
      },
      {
        day: "Day 3",
        activities: ["Hampi"],
        hotel: {
          name: "Hyatt Place Hampi",
          link: "https://www.google.com/maps/search/?api=1&query=Hyatt+Place+Hampi"
        }
      }
    ]
  },

  Maharashtra: {
    places: [
      { name: "Ellora Caves", img: imgFor("Ellora caves.jpg"), desc: "Rock-cut caves", map: "https://maps.google.com?q=Ellora+Caves" },
      { name: "Lonavala & Khandala", img: imgFor("Lonavala.jpg"), desc: "Hill stations", map: "https://maps.google.com?q=Lonavala" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Ellora Caves"],
        hotel: {
          name: "The Fern Residency, Aurangabad",
          link: "https://www.google.com/maps/search/?api=1&query=The+Fern+Residency+Aurangabad"
        }
      },
      {
        day: "Day 2",
        activities: ["Lonavala & Khandala"],
        hotel: {
          name: "Della Resorts, Lonavala",
          link: "https://www.google.com/maps/search/?api=1&query=Della+Resorts+Lonavala"
        }
      }
    ]
  },

  "Uttar Pradesh": {
    places: [
      { name: "Taj Mahal", img: imgFor("Taj mahal.jpg"), desc: "Symbol of love", map: "https://maps.google.com?q=Taj+Mahal" },
      { name: "Varanasi", img: imgFor("Varanasi.jpg"), desc: "Spiritual capital", map: "https://maps.google.com?q=Varanasi" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Taj Mahal", "Agra Fort"],
        hotel: {
          name: "The Oberoi Amarvilas, Agra",
          link: "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Amarvilas+Agra"
        }
      },
      {
        day: "Day 2",
        activities: ["Varanasi Ghats", "Ganga Aarti"],
        hotel: {
          name: "BrijRama Palace, Varanasi",
          link: "https://www.google.com/maps/search/?api=1&query=BrijRama+Palace+Varanasi"
        }
      }
    ]
  },

  Delhi: {
    places: [
      { name: "Red Fort", img: imgFor("Red fort.jpg"), desc: "Historic Mughal fort", map: "https://maps.google.com?q=Red+Fort" },
      { name: "India Gate", img: imgFor("India Gate.jpg"), desc: "War memorial", map: "https://maps.google.com?q=India+Gate" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Red Fort", "Chandni Chowk"],
        hotel: {
          name: "Haveli Dharampura",
          link: "https://www.google.com/maps/search/?api=1&query=Haveli+Dharampura+Delhi"
        }
      },
      {
        day: "Day 2",
        activities: ["India Gate", "National Museum"],
        hotel: {
          name: "The Imperial, New Delhi",
          link: "https://www.google.com/maps/search/?api=1&query=The+Imperial+New+Delhi"
        }
      }
    ]
  },

  Kerala: {
    places: [
      { name: "Alleppey Houseboats", img: imgFor("Alleppey.jpg"), desc: "Backwater cruises", map: "https://maps.google.com?q=Alleppey" },
      { name: "Munnar", img: imgFor("Munnar.jpg"), desc: "Serene waterways", map: "https://maps.google.com?q=Munnar" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Alleppey Houseboat"],
        hotel: {
          name: "Marari Beach Resort – CGH Earth",
          link: "https://www.google.com/maps/search/?api=1&query=Marari+Beach+Resort+Kerala"
        }
      },
      {
        day: "Day 2",
        activities: ["Kerala Backwaters"],
        hotel: {
          name: "Blanket Hotel & Spa, Munnar",
          link: "https://www.google.com/maps/search/?api=1&query=Blanket+Hotel+and+Spa+Munnar"
        }
      }
    ]
  },

  Goa: {
    places: [
      { name: "Salaulim Dam", img: imgFor("Salaulim Dam Goa.jpg"), desc: "Scenic dam", map: "https://maps.google.com?q=Salaulim+Dam" },
      { name: "Dudhsagar Waterfalls", img: imgFor("Dudhsagar Goa.jpg"), desc: "Waterfall", map: "https://maps.google.com?q=Dudhsagar" },
      { name: "Aguada Fort", img: imgFor("Aguada fort.jpg"), desc: "Portuguese fort", map: "https://maps.google.com?q=Aguada+Fort" }
    ],
    itinerary: [
      {
        day: "Day 1",
        activities: ["Dudhsagar Waterfalls"],
        hotel: {
          name: "Dudhsagar Plantation Resort",
          link: "https://www.google.com/maps/search/?api=1&query=Dudhsagar+Plantation+Resort+Goa"
        }
      },
      {
        day: "Day 2",
        activities: ["Aguada Fort", "Beaches"],
        hotel: {
          name: "Taj Fort Aguada Resort & Spa",
          link: "https://www.google.com/maps/search/?api=1&query=Taj+Fort+Aguada+Resort+Goa"
        }
      },
      {
        day: "Day 3",
        activities: ["Salaulim Dam"],
        hotel: {
          name: "The Leela Goa",
          link: "https://www.google.com/maps/search/?api=1&query=The+Leela+Goa"
        }
      }
    ]
  }
};


/* ---------- HELPERS ---------- */
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load saved places");
  return res.json();
};

const placeKey = (state, name) => `${state}-${name}`;
export default function HolidaysItinerary() {
  const { user, loading } = useAuth();

  /* ---------- STATE ---------- */
  const [state, setState] = useState(
    () => localStorage.getItem("selectedState") || ""
  );

  const [itineraryOpen, setItineraryOpen] = useState(false);

  /* 🔑 itinerary MUST be declared BEFORE useEffect */
  const [itinerary, setItinerary] = useState([]);

  /* ---------- SIDE EFFECTS ---------- */
  useEffect(() => {
    localStorage.setItem("selectedState", state);
  }, [state]);

  /* 🔁 sync itinerary when state changes */
  useEffect(() => {
    if (!state) {
      setItinerary([]);
      setItineraryOpen(false);
    } else {
      setItinerary(DATA[state]?.itinerary || []);
    }
  }, [state]);

  /* ---------- STATE DATA ---------- */
  const stateData = DATA[state] || {};
  const places = stateData.places || [];

  /* ---------- WEATHER ---------- */
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

  /* ---------- SAVED PLACES ---------- */
  const savedKey =
    !loading && user?.uid ? `/api/places?userId=${user.uid}` : null;

  const { data: savedPlaces = [], mutate } = useSWR(savedKey, fetcher);

  const savedSet = useMemo(
    () => new Set(savedPlaces.map((p) => placeKey(p.state, p.name))),
    [savedPlaces]
  );

  /* ---------- SAVE PLACE ---------- */
  const handleSave = async (place) => {
    if (!user || savedSet.has(placeKey(state, place.name))) return;

    mutate(
      (current = []) => [
        ...current,
        {
          name: place.name,
          state,
          description: place.desc,
          image: place.img,
        },
      ],
      { revalidate: false }
    );

    try {
      await savePlace(
        {
          name: place.name,
          state,
          description: place.desc,
          image: place.img,
        },
        user.uid
      );
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

        {/* Controls */}
        <div className="controls-row">
          <div className="left-controls">
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">-- Choose state --</option>
              {Object.keys(DATA).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {state && itinerary.length > 0 && (
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

        {/* Places */}
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
                      onClick={() => {
                        if (!user) {
                          toast.error(
                            "Please sign in with Google to save places"
                          );
                          return;
                        }
                        handleSave(p);
                      }}
                    >
                      {saved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* Itinerary Modal */}
        <ItineraryModal
          open={itineraryOpen}
          onClose={() => setItineraryOpen(false)}
          state={state}
          places={places}
          itinerary={itinerary}
          user={user}
          onDeleteDay={(dayId) => {
            setItinerary((prev) =>
              prev.filter((d) => d.day !== dayId)
            );
          }}
        />
      </main>
    </div>
  );
}
