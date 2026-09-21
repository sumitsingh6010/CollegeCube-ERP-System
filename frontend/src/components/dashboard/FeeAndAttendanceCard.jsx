import { useEffect, useState } from "react";
import AttendanceProgress from "../attendance/AttendanceProgress";
import { getMyFees } from "../../services/feesService";

const FeeAndAttendanceCard = () => {
  const [fees, setFees] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      console.log("📌 Fetching fees summary (Student Card)");
      const res = await getMyFees();
      setFees(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch fees");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl pt-2 pb-8
flex flex-col md:flex-row items-center justify-between gap-10">

      {/* LEFT → Attendance */}
      <div className="flex-1 flex justify-center">
        <AttendanceProgress />
      </div>

      {/* RIGHT → Fees Info */}
      <div className="flex-1 space-y-2 text-center md:text-left">

        <h2 className="text-xl font-semibold text-gray-700">
          Fees Overview
        </h2>

        {fees ? (
          <>
            <div>
              <p className="text-gray-500 text-sm">
                Status
              </p>
              <p
                className={`font-semibold ${
                  fees.status === "PAID"
                    ? "text-green-600"
                    : fees.status === "PARTIAL"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {fees.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Remaining Amount
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{fees.dueAmount}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-400">
            Loading fees...
          </p>
        )}
      </div>
    </div>
  );
};

export default FeeAndAttendanceCard;
