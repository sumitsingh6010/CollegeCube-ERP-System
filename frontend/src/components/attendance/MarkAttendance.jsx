import { useEffect, useState } from "react";
import StudentList from "../../components/attendance/StudentList";
import {
  markAttendance,
  getCurrentAttendanceDay,
} from "../../services/attendanceService";

const MarkAttendance = () => {
  const [presentStudents, setPresentStudents] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(false);

  /* -------------------- FETCH CURRENT DAY -------------------- */
  useEffect(() => {
    fetchDay();
  }, []);

  const fetchDay = async () => {
    try {
      console.log("📌 Fetching current attendance day");
      const res = await getCurrentAttendanceDay();
      setCurrentDay(res?.data?.currentDay || 1);
    } catch (err) {
      console.error("❌ Failed to fetch attendance day", err);
      setCurrentDay(1);
    }
  };

  /* -------------------- TOGGLE STUDENT -------------------- */
  const toggleStudent = (studentId) => {
    setPresentStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  /* -------------------- SUBMIT ATTENDANCE -------------------- */
  const submitAttendance = async () => {
    if (presentStudents.length === 0) {
      alert("Please mark at least one student present");
      return;
    }

    try {
      setLoading(true);
      console.log("📌 Submitting attendance");

      await markAttendance({
        presentStudentIds: presentStudents,
      });

      alert(`Day ${currentDay} attendance marked successfully`);
      setPresentStudents([]);
      fetchDay(); // move to next day
    } catch (err) {
      console.error("❌ Attendance submit failed", err);
      alert("Failed to submit attendance");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Mark Day {currentDay} Attendance
      </h1>

      {/*  STUDENT LIST */}
      <StudentList
        renderAction={(student) => (
          <input
            type="checkbox"
            checked={presentStudents.includes(student._id)}
            onChange={() => toggleStudent(student._id)}
          />
        )}
      />

      <button
        disabled={loading}
        onClick={submitAttendance}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Submitting..." : `Mark Day ${currentDay} Attendance`}
      </button>
    </div>
  );
};

export default MarkAttendance;
