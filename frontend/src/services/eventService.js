import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


// ================= GET ALL EVENTS =================
export const getAllEvents = () => {
  console.log("📌 API: Fetch all events");
  return API.get("/events/get-all-events");
};


// ================= CREATE EVENT (ADMIN) =================
export const createEvent = (data) => {
  console.log("📌 API: Create event");
  return API.post("/events/create-event", data);
};


// ================= REGISTER FOR EVENT (STUDENT) =================
export const registerEvent = (data) => {
  console.log("📌 API: Register for event");
  return API.post("/events/register-event", data);
};