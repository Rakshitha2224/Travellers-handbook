export async function getSavedPlaces(userId) {
  const res = await fetch(`/api/places?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch places");
  return res.json();
}

export async function savePlace(place, userId) {
  const res = await fetch(`/api/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...place, userId }),
  });
  if (!res.ok) throw new Error("Failed to save place");
  return res.json();
}

export async function deletePlace(id) {
  const res = await fetch(`/api/places/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete place");
  return res.json();
}
