const StatCard = ({ icon, value, label }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 w-full">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
