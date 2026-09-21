import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ================= MARK ATTENDANCE =================
export const markAttendance = (data) => {
  console.log("📌 API: Mark attendance");
  return API.post("/faculty/attendance/mark", data);
};

// ================= CURRENT DAY =================
export const getCurrentAttendanceDay = (departmentId) => {
  console.log("📌 API: Fetch current attendance day");
  return API.get(
    `/faculty/attendance/current-day?departmentId=${departmentId}`
  );
};

// ================= FACULTY: VIEW STUDENT ATTENDANCE =================
export const getFacultyAttendanceSummary = (studentId) => {
  console.log("📌 API: Fetch faculty attendance summary");
  return API.get(`/faculty/attendance/summary/${studentId}`);
};

// ================= STUDENT: VIEW OWN ATTENDANCE =================
export const getStudentAttendanceSummary = () => {
  console.log("📌 API: Fetch student attendance summary");
  return API.get(`/student/attendance/summary`);
};
