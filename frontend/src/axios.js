import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default API;

// window.location.hostname === "localhost"
// ? "http://localhost:8000/api/"
// : "https://flower-empower.propulsion-learn.ch/api/",
