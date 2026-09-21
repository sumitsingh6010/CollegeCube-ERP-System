// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AttendanceProgress from "./AttendanceProgress";
// import AttendanceStats from "./AttendanceStats";
// import {
//   getFacultyAttendanceSummary,
//   getStudentAttendanceSummary,
// } from "../../services/attendanceService";

// const AttendanceDetail = ({ role }) => {
//   const { studentId } = useParams();
//   const [summary, setSummary] = useState(null);

//   useEffect(() => {
//     fetchAttendanceSummary();
//   }, [studentId]);

//   const fetchAttendanceSummary = async () => {
//     try {
//       console.log("📌 Fetching attendance summary (stats)");

//       const res =
//         role === "FACULTY"
//           ? await getFacultyAttendanceSummary(studentId)
//           : await getStudentAttendanceSummary();

//       setSummary(res.data);
//     } catch (error) {
//       console.error("❌ Failed to fetch attendance summary");
//     }
//   };

//   if (!summary) {
//     return (
//       <div className="mt-8 text-center text-gray-500">
//         Loading attendance...
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8">
//       {/* Progress (self-fetching) */}
//       <AttendanceProgress role={role} />

//       <div className="my-6" />

//       <div><br /></div>

//       {/* Stats */}
//       <AttendanceStats
//         present={summary.presentPercentage}
//         absent={summary.absentPercentage}
//         pending={summary.pendingPercentage}
//       />
//     </div>
//   );
// };

// export default AttendanceDetail;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceProgress from "./AttendanceProgress";
import AttendanceStats from "./AttendanceStats";
import {
  getFacultyAttendanceSummary,
  getStudentAttendanceSummary,
} from "../../services/attendanceService";

const AttendanceDetail = ({ role }) => {
  const { studentId } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchAttendanceSummary();
  }, [studentId]);

  const fetchAttendanceSummary = async () => {
    try {
      const res =
        role === "FACULTY"
          ? await getFacultyAttendanceSummary(studentId)
          : await getStudentAttendanceSummary();

      setSummary(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch attendance summary");
    }
  };

  if (!summary) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading attendance...
      </div>
    );
  }

  return (
    <div className="mt-8 px-6">
      {/* ===== TOP CARD ===== */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Progress */}
        <div className="flex justify-center w-full md:w-1/2">
          <AttendanceProgress role={role} />
        </div>

        {/* Numbers */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Attendance Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500">Total Sessions</p>
              <p className="text-xl font-semibold">
                {summary.totalDays}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-700">Present</p>
              <p className="text-xl font-semibold text-green-600">
                {summary.presentDays}
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-700">Absent</p>
              <p className="text-xl font-semibold text-red-600">
                {summary.absentDays}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-700">Pending</p>
              <p className="text-xl font-semibold text-yellow-600">
                {summary.pendingDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="mt-8">
        <AttendanceStats
          present={summary.presentPercentage}
          absent={summary.absentPercentage}
          pending={summary.pendingPercentage}
        />
      </div>
    </div>
  );
};

export default AttendanceDetail;
