import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const sendApplication = (data) =>
  API.post("/applications/send", data);

export const getStudentApplications = () =>
  API.get("/applications/student");

export const getInboxApplications = () =>
  API.get("/applications/inbox");

export const updateApplicationStatus = (data) =>
  API.put("/applications/status", data);