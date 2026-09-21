import { useNavigate, useLocation } from "react-router-dom";
import { sidebarConfig } from "../../config/sidebarConfig";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const config = sidebarConfig[role];

  const handleClick = (item) => {
    if (item.action === "LOGOUT") {
      localStorage.clear();
      navigate("/login");
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col shadow-sm">
      {/* Title */}
      <div className="p-5 border-b text-lg font-semibold">
        {role} Panel
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {config.map((item) => {
          const isActive =
            item.path &&
            location.pathname === item.path;

          return (
            <div
              key={item.title}
              onClick={() => handleClick(item)}
              className={`px-5 py-3 cursor-pointer transition flex items-center gap-3 ${
                isActive
                  ? "bg-blue-50 border-r-4 border-blue-600 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-medium">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;