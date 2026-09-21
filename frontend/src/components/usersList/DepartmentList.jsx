import { useEffect, useState } from "react";

const DepartmentList = ({
  fetchDepartments,
  selectedDepartment,
  onSelect,
}) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      const res = await fetchDepartments();
      setDepartments(res.data);

      if (!selectedDepartment && res.data.length > 0) {
        onSelect(res.data[0]);
      }
    };

    loadDepartments();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-3">Departments</h2>

      <div className="space-y-2">
        {departments.map((dept) => (
          <button
            key={dept._id}
            onClick={() => onSelect(dept)}
            className={`w-full flex justify-between px-3 py-2 rounded-md text-sm
              ${
                selectedDepartment?._id === dept._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
          >
            <span>{dept.name}</span>
            <span>{dept.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
