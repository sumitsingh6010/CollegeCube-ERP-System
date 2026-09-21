import api from "./api";

export const fetchAnnouncements = () => {
  console.log("📌 API: Fetch announcements");
  return api.get("/announcements");
};

export const createAnnouncement = (data) => {
  console.log("📌 API: Create announcement");
  return api.post("/announcements", data);
};

export const deleteAnnouncement = (id) => {
  console.log("📌 API: Delete announcement");
  return api.delete(`/announcements/${id}`);
};

