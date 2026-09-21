const FeesStats = ({ fees }) => {
  const due = fees.totalAmount - fees.paidAmount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Stat label="Paid" value={`₹${fees.paidAmount}`} accent="green" />
      <Stat label="Due" value={`₹${due}`} accent="red" />
      <Stat label="Total Fees" value={`₹${fees.totalAmount}`} accent="blue" />
      <Stat label="Status" value={fees.status} accent="yellow" />
    </div>
  );
};

const Stat = ({ label, value, accent }) => {
  const colors = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold mt-2 ${colors[accent]}`}>
        {value}
      </p>
    </div>
  );
};

export default FeesStats;
