import { useEffect, useState } from "react";
import { fetchSubjects } from "../../services/notesService";
import { useNavigate } from "react-router-dom";

const NotesSubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const res = await fetchSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to load subjects");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Subjects</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            onClick={() => navigate(`/notes/${subject._id}`)}
            className="bg-white p-6 rounded-xl shadow  hover:shadow-xl
                hover:-translate-y-1
                border border-gray-300
                hover:bg-blue-50
                hover:border-blue-400
                transition-all
                duration-300
                cursor-pointer "
          >
            <h3 className="font-semibold text-lg">
              {subject.name}
            </h3>
            <p className="text-sm text-gray-500">
              Semester {subject.semester}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSubjectsPage;
