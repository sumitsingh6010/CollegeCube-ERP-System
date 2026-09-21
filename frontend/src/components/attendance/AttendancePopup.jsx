import { useNavigate } from "react-router-dom";

const AttendancePopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[340px] p-6 animate-scaleIn">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Manage Attendance
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/faculty/attendance/mark")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            Mark Attendance
          </button>

          <button
            onClick={() => navigate("/faculty/attendance/view")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition"
          >
            View Attendance
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 block mx-auto transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AttendancePopup;
