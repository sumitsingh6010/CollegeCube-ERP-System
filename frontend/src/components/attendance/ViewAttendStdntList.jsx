


import { useNavigate } from "react-router-dom";
import StudentList from "./StudentList";

const ViewAttendancePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        View Attendance
      </h1>

      <StudentList
        renderAction={(student) => (
          <button
            onClick={() =>
              navigate(`/faculty/attendance/student/${student._id}`)
            }
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700"
          >
            View Attendance
          </button>
        )}
      />
    </div>
  );
};

export default ViewAttendancePage;
