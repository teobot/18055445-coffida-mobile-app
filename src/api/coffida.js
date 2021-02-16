import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.216:3333/api/1.0.0",
  timeout: 5000,
});
