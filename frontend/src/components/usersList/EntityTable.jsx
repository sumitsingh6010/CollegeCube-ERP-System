import { useEffect, useState } from "react";

const EntityTable = ({
  title,
  fetchData,
  department,
  columns,
  actionLabel,
  onAddClick,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!department?._id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetchData(department._id);
        setData(res.data || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [department, fetchData]);

  // 🔑 Helper to safely read nested keys like "userId.name"
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          {department.name} {title}
        </h2>

        <button
  onClick={onAddClick}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
>
  + Add {actionLabel}
</button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-3 text-left font-medium text-gray-700"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="p-3">
                      {getValue(item, col.key) ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntityTable;
