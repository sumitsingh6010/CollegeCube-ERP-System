import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getFacultyAttendanceSummary,
  getStudentAttendanceSummary,
} from "../../services/attendanceService";

const AttendanceProgress = ({ role = "STUDENT" }) => {
  const { studentId } = useParams(); // used only for faculty
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, [studentId]);

  const fetchProgress = async () => {
    try {
      console.log("📌 Fetching attendance progress");

      const res =
        role === "FACULTY"
          ? await getFacultyAttendanceSummary(studentId)
          : await getStudentAttendanceSummary();

      setPercentage(res.data.presentPercentage);
    } catch (error) {
      console.error("❌ Failed to fetch attendance progress");
    }
  };

  if (percentage === null) {
    return (
      <div className="w-40 h-40 mx-auto flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-32 h-32 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: "#2563eb",
          textColor: "#1f2937",
          trailColor: "#e5e7eb",
          textSize: "18px",
        })}
      />
      <p className="text-center mt-2 font-medium">
        Class Attendance
      </p>
    </div>
  );
};

export default AttendanceProgress;
