import { useAuth } from "../context/useAuth";
import useSWR from "swr";
import { motion as Motion } from "framer-motion";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load saved places");
  return res.json();
};

const getPlaceState = (p) => p.state || p.placeState || p.location;

export default function SavedPlaces() {
  const { user } = useAuth();

  const key = user?.uid ? `/api/places?userId=${user.uid}` : null;
  const { data: places = [], error, mutate } = useSWR(key, fetcher);

  const handleDelete = async (id) => {
    mutate((curr = []) => curr.filter((p) => p._id !== id), { revalidate: false });

    try {
      await fetch(`/api/places/${id}`, { method: "DELETE" });
      mutate();
    } catch {
      mutate();
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>Please sign in to view saved places.</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>Failed to load saved places.</p>;
  }

  return (
    <main>
      <h2 className="page-title">Saved Places</h2>

      {places.length === 0 ? (
        <p style={{ textAlign: "center" }}>You haven’t saved any places yet.</p>
      ) : (
        <div className="grid-3">
          {places.map((place) => (
            <Motion.div
              key={place._id}
              className="card"
              whileHover={{ scale: 1.03 }}
            >
              <div className="image-wrap">
                <img src={place.image} alt={place.name} />
              </div>

              <div className="card-body">
                <h3 className="card-title">{place.name}</h3>
                <p className="card-desc">{getPlaceState(place)}</p>
                <p className="card-desc">{place.description}</p>
<br></br>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(place._id)}
                >
                  Delete
                </button>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </main>
  );
}