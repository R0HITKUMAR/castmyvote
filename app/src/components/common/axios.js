import axios from "axios";

if (document.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://localhost:5000";
} else if (document.location.hostname === "castmyvote.aboutrohit.in") {
  axios.defaults.baseURL = "https://server.castmyvote.aboutrohit.in";
} else {
  axios.defaults.baseURL = "https://server.castmyvote.aboutrohit.in";
}

export default axios;
