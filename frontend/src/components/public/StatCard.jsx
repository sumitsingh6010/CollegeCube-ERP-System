const StatCard = ({ number, label }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center shadow">

      <h3 className="text-2xl font-bold text-blue-600">
        {number}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        {label}
      </p>

    </div>
  );
};

export default StatCard;