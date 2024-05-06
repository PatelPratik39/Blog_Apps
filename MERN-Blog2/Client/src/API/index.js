import axios from "axios";

// const API_URL = "http://localhost:3001/";
const API_URL = "https://blog-apps-g2kf.onrender.com/";

export const fetchAllPost = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};


// whfb-qsdx-hmnc-vuts-imyg