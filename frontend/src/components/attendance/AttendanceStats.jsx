const AttendanceStats = ({
  present,
  absent,
  pending,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Present</p>
        <p className="text-xl font-semibold text-green-600">
          {present}%
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Absent</p>
        <p className="text-xl font-semibold text-red-600">
          {absent}%
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Pending</p>
        <p className="text-xl font-semibold text-yellow-600">
          {pending}%
        </p>
      </div>
    </div>
  );
};

export default AttendanceStats;
