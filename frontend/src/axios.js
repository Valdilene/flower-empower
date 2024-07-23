import axios from "axios";

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8000/api/'
  : 'https://flower-empower.propulsion-learn.ch/api/';

const API = axios.create({
  baseURL: baseURL,
});

export default API;
