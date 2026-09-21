import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAdminDashboardStats = () => {
  return API.get("/dashboard-stats");
};
