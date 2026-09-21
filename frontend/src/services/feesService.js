import api from "./api";

/* ================= GET FEES SUMMARY ================= */
export const getMyFees = () => {
  console.log("📌 API: Fetch my fees");
  return api.get("/student/fees");
};

/* ================= CREATE ORDER ================= */
export const createFeesOrder = (amount) => {
  console.log("📌 API: Create fees order");
  return api.post("/student/fees/create-order", { amount });
};

/* ================= VERIFY PAYMENT ================= */
export const verifyFeesPayment = (data) => {
  console.log("📌 API: Verify fees payment");
  return api.post("/student/fees/verify-payment", data);
};

export const getAdminFeesDashboard = () => {
  return api.get("/fees/admin-dashboard");
};
