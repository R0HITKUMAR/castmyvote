import axios from "axios";

if (document.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://localhost:5000";
} else if (document.location.hostname === "castmyvote.ml") {
  axios.defaults.baseURL = "https://server.castmyvote.ml";
} else {
  axios.defaults.baseURL = "https://server.castmyvote.ml";
}

export default axios;
