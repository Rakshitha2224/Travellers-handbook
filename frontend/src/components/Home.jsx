import welcomeImg from "../assets/animations/Traveller-welcome msg.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const cards = [
  {
    title: "Art & Crafts",
    desc: "Discover India’s traditional arts and crafts, from handloom weaving and folk paintings to timeless handmade masterpieces.",
    route: "/arts",
    img: "/assets/art-and-crafts.jpg",
  },
  {
    title: "Festivals",
    desc: "Explore India’s vibrant festivals and traditions that bring communities together through color, culture, and celebration.",
    route: "/festivals",
    img: "/assets/festivals.jpg",
  },
  {
    title: "Holidays & Itinerary",
    desc: "Plan unforgettable trips across India with curated destinations and easy-to-follow day-wise itineraries.",
    route: "/holidays",
    img: "/assets/Itinerary.jpg",
  },
];

export default function Home() {
  const nav = useNavigate();
  const [showImage, setShowImage] = React.useState(false);
  
React.useEffect(() => {
  const t = setTimeout(() => setShowImage(true), 900);
  return () => clearTimeout(t);
}, []);

return (
  <div className="page-bg">
    <main className="page-container">
      {/* ---------- HEADER ---------- */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-title-wrapper">
            <Motion.span
              className="home-title-left"
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Traveller's
            </Motion.span>

            <Motion.span
              className="home-title-right"
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Handbook
            </Motion.span>
          </div>

          {/* Traveler image */}
          <div className="home-traveler-wrap">
            {showImage && (
              <Motion.img
                src={welcomeImg}
                alt="Welcome"
                className="home-traveler drop"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </div>
        </div>
      </header>

      {/* ---------- FEATURE CARDS ---------- */}
      <section className="grid-3">
        {cards.map((c) => (
          <Motion.div
            key={c.title}
            className="card"
            whileHover={{ scale: 1.02 }}
            onClick={() => nav(c.route)}
            style={{ cursor: "pointer" }}
          >
            <img src={c.img} alt={c.title} className="card-media" />

            <div className="card-body">
              <h3 className="card-title">{c.title}</h3>
              <p className="card-desc">{c.desc}</p>
            </div>
          </Motion.div>
        ))}
      </section>
    </main>
  </div>
);
}