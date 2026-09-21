import FeesSearchBar from "./FeesSearchBar";

const FeesStudentsTable = ({ students, search, setSearch }) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-semibold text-gray-800">
          Students Fee List
        </h2>

        <FeesSearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          {/* HEADER */}

          <thead className="bg-gray-50 text-gray-600 text-sm">

            <tr>

              <th className="text-left py-3 px-3 font-medium">
                Student
              </th>

              <th className="text-left py-3 px-3 font-medium">
                Department
              </th>

              <th className="text-center py-3 px-3 font-medium">
                Total Fee
              </th>

              <th className="text-center py-3 px-3 font-medium">
                Paid
              </th>

              <th className="text-center py-3 px-3 font-medium">
                Remaining
              </th>

              <th className="text-center py-3 px-3 font-medium">
                Status
              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody className="divide-y">

            {students.map((s, index) => {

              const remaining = s.totalFee - s.paid;

              return (

                <tr
                  key={s._id || s.id || index}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="py-3 px-3 font-medium text-gray-800">
                    {s.name}
                  </td>

                  <td className="py-3 px-3 text-gray-600">
                    {s.department}
                  </td>

                  <td className="py-3 px-3 text-center font-medium">
                    ₹{s.totalFee}
                  </td>

                  <td className="py-3 px-3 text-center text-green-600 font-semibold">
                    ₹{s.paid}
                  </td>

                  <td className="py-3 px-3 text-center text-red-500 font-semibold">
                    ₹{remaining}
                  </td>

                  <td className="py-3 px-3 text-center">

                    {remaining === 0 ? (

                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>

                    ) : (

                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>

                    )}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default FeesStudentsTable;