import { useEffect, useState } from "react";
import { getFacultyStudentsByDepartment } from "../../services/studentService";

const StudentList = ({ renderAction }) => {
  const [students, setStudents] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log("📌 Fetching students");

      const res = await getFacultyStudentsByDepartment();

      const studentList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.students)
        ? res.data.students
        : [];

      setStudents(studentList);
    } catch (err) {
      console.error("❌ Failed to fetch students", err);
      setStudents([]);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {fetching ? (
        <p className="text-gray-500 text-sm">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500 text-sm">No students found</p>
      ) : (
        students.map((student) => (
          <div
            key={student._id}
            className="flex justify-between items-center border-b last:border-b-0 py-2"
          >
            <span className="font-medium">
              {student.userId?.name || "Unnamed Student"}
            </span>

            
            {renderAction(student)}
          </div>
        ))
      )}
    </div>
  );
};

export default StudentList;
