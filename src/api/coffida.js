import axios from "axios";

// This is my axios instance,
// Here I set the location of the coffida server
export default axios.create({
  baseURL: "http://192.168.1.216:3333/api/1.0.0",
  timeout: 5000,
});
