import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FeesProgress = ({ fees }) => {
  const percentage = Math.round(
    (fees.paidAmount / fees.totalAmount) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <div className="w-40 h-40">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: "#16a34a",
            textColor: "#111827",
            trailColor: "#e5e7eb",
            textSize: "18px",
          })}
        />
      </div>

      <p className="mt-4 font-medium text-gray-700">
        Fees Paid
      </p>
      <p className="text-sm text-gray-400">
        Progress overview
      </p>
    </div>
  );
};

export default FeesProgress;
