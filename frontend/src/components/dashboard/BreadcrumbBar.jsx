import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role"); // ADMIN | STUDENT | FACULTY

  const getDashboardPath = () => {
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "FACULTY") return "/faculty/dashboard";
    if (role === "STUDENT") return "/student/dashboard";
    return "/login";
  };

  const dashboardPath = getDashboardPath();

  // Decide page name from URL
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage =
    pathParts[pathParts.length - 1] === "dashboard"
      ? "Dashboard"
      : pathParts[pathParts.length - 1]
          ?.replace("-", " ")
          ?.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
 <div className="fixed top-16 left-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between">
  {/* Left breadcrumb */}
  <div className="flex items-center gap-3 text-sm">
    <button
      onClick={() => navigate(dashboardPath)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-all duration-200"
    >
      <span className="text-base">&lt;</span>

      <span>Dashboard</span>
    </button>

    <span className="text-gray-400">/</span>

    <span className="text-gray-800 font-semibold tracking-wide">
      {currentPage}
    </span>
  </div>

 
</div>

  );
};

export default BreadcrumbBar;
