import api from "./api";

/* ================= GET SUBJECTS ================= */
export const fetchSubjects = () => {
  console.log("📌 API: Fetch subjects");
  return api.get("/notes/subjects");
};

/* ================= GET NOTES ================= */
export const fetchNotes = (subjectId, unit) => {
  console.log("📌 API: Fetch notes");
  return api.get(`/notes/${subjectId}/${unit}`);
};

/* ================= UPLOAD NOTE ================= */
export const uploadNote = (formData) => {
  console.log("📌 API: Upload note");

  return api.post("/notes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= DELETE NOTE ================= */
export const deleteNote = (id) => {
  console.log("📌 API: Delete note");
  return api.delete(`/notes/${id}`);
};
