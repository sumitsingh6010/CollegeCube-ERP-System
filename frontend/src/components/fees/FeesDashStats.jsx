import { IndianRupee, Wallet, AlertCircle } from "lucide-react";

const iconMap = {
  total: IndianRupee,
  collected: Wallet,
  pending: AlertCircle,
};

const FeesDashStats = ({ title, value, type }) => {

  const styles = {
    total: "from-blue-500 to-blue-600",
    collected: "from-green-500 to-green-600",
    pending: "from-red-500 to-red-600",
  };

  const Icon = iconMap[type];

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition duration-300 p-6">

      {/* icon background */}
      <div
        className={`absolute right-4 top-4 p-3 rounded-lg bg-gradient-to-r ${styles[type]} text-white`}
      >
        <Icon size={22} />
      </div>

      <p className="text-gray-500 text-sm font-medium">{title}</p>

      <h2 className="text-3xl font-bold mt-3">{value}</h2>

      <p className="text-xs text-gray-400 mt-1">
        Updated in real time
      </p>

    </div>
  );
};

export default FeesDashStats;