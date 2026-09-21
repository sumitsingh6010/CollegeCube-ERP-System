import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

import { facultyAPI } from "./apiFaculty";

export const fetchStudentDepartments = () => API.get("/student/departments");

export const fetchStudentsByDepartment = (departmentId) =>
  API.get(`/student?departmentId=${departmentId}`);

export const getFacultyStudentsByDepartment = () => {
  return facultyAPI.get("/students");
};
