import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchAllPost = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
