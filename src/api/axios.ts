import axios from "axios";
const BASE_URL = "http://localhost:3000"

//for public route
export default axios.create({
  baseURL: BASE_URL
});

//for setting up the jwt auth
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": "application/json"},
  withCredentials: true
})