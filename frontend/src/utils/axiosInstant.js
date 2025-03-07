import axios from "axios";

const axiosInstant = axios.create({
  baseURL: "http://localhost:8080", // Update with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstant;
