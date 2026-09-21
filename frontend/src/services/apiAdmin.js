import axios from "axios";

export const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
