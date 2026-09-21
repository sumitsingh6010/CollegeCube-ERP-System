import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchDepartments = () => API.get("/faculty/departments");

export const fetchFacultyByDepartment = (departmentId) =>
  API.get(`/faculty?departmentId=${departmentId}`);
