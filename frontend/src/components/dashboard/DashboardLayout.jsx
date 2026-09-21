import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../navbar/TopNavbar";
import StatsBar from "./StatsBar";
import ModulesSlider from "./ModulesSlider";
import AttendancePopup from "../attendance/AttendancePopup";
import AttendanceProgress from "../attendance/AttendanceProgress";
import { dashboardConfig } from "../../config/dashboardConfig";
import { getAdminDashboardStats } from "../../services/dashboardService";
import Sidebar from "./Sidebar";
import FeeAndAttendanceCard from "./FeeAndAttendanceCard";

const DashboardLayout = ({ role }) => {
  const config = dashboardConfig[role];
  const navigate = useNavigate();

  /* ================= ADMIN STATS ================= */
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
  });

  useEffect(() => {
    if (role !== "ADMIN") return;

    const fetchStats = async () => {
      try {
        console.log("?? Fetching admin dashboard stats");
        const res = await getAdminDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error("? Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, [role]);

  /* ================= ATTENDANCE POPUP ================= */
  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleModuleClick = (module) => {
    console.log("CLICKED MODULE:", module.title);

    // ? Faculty Attendance ? Popup
    if (role === "FACULTY" && module.title === "Attendance") {
      setShowAttendancePopup(true);
      return;
    }

    // ? Default navigation
    if (module.path) {
      navigate(module.path);
    }
  };

  return (
  <div className="h-screen overflow-hidden bg-gray-50">
    {/* Top Navbar */}
    
  <TopNavbar
    role={role}
    onToggleSidebar={() =>
      setSidebarOpen((prev) => !prev)
    }
  />
  <br />
  <br />
   
    {/* Layout Body */}
     <div className="flex h-[calc(100vh-64px)] relative">

    {/* Sidebar (Overlay Mode) */}
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] z-40 transition-transform duration-300 ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      <Sidebar role={role} />
    </div>

    {/* Dark Overlay */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/30 z-30"
        onClick={() => setSidebarOpen(false)}
      />
    )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* Student Attendance Progress */}
        {role === "STUDENT" && (
         <div className="max-w-4xl mt-9 mx-auto mb-10">
          <FeeAndAttendanceCard />
        </div>
         )}


        {/* Admin Stats */}
        {config.showStats && role === "ADMIN" && (
          <StatsBar stats={stats} />
        )}

        {/* Modules Slider (optional: keep or remove later) */}
        <ModulesSlider
          modules={config.modules}
          onModuleClick={handleModuleClick}
        />
      </div>
    </div>

    {/* Faculty Attendance Popup */}
  
    {showAttendancePopup && (
      <AttendancePopup
        onClose={() => setShowAttendancePopup(false)}
      />
    )}
  </div>
);

};

export default DashboardLayout;
