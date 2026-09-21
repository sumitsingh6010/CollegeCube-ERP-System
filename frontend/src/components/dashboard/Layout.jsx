import { Outlet, Navigate } from "react-router-dom";
import TopNavbar from "../navbar/TopNavbar";
import BreadcrumbBar from "./BreadcrumbBar";
const AppLayout = () => {
  const token = localStorage.getItem("token");

  // ?? Protect all private routes
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 pt-16">
      <TopNavbar />
      <BreadcrumbBar />
      <main className="mt-[52px] h-[calc(100vh-64px-52px)] overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
