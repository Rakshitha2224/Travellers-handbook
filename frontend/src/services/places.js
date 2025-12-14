import axios from "axios";

const API_URL = "http://localhost:5000/api/places";

export const savePlace = async (place, userId) => {
  const res = await axios.post(API_URL, {
    ...place,
    userId,
  });
  return res.data;
};
