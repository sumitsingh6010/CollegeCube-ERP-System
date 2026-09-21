import { useParams, useNavigate } from "react-router-dom";

const NotesUnitsPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const units = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Select Unit
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {units.map((unit) => (
            <div
              key={unit}
              onClick={() =>
                navigate(`/notes/${subjectId}/${unit}`)
              }
              className="
                bg-white
                border border-gray-300
                rounded-xl
                p-6
                text-center
                font-medium
                text-gray-700
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-1
                hover:bg-blue-50
                hover:border-blue-400
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Unit {unit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesUnitsPage;
