import { useEffect, useState } from "react";
import FeesStats from "../../components/fees/FeesStats";
import FeesProgress from "../../components/fees/FeesProgress";
import PayFeesCard from "../../components/fees/PayFeesCard";
import StudentFeesHeader from "../../components/fees/StudentFeesHeader";
import { getMyFees } from "../../services/feesService";

const FeesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await getMyFees();
      setData(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch fees");
    }
  };

  if (!data) {
    return (
      <p className="text-gray-500 p-6 text-center">
        Loading fees...
      </p>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* STUDENT HEADER */}
      <StudentFeesHeader  />
       {/* <StudentFeesHeader student={data.student} /> */}

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT BIG CONTAINER */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-md border p-8 space-y-10">
          {/* STATS */}
          <FeesStats fees={data} />

          {/* PROGRESS */}
          <div className="flex justify-center">
            <FeesProgress fees={data} />
          </div>
        </div>

        {/* RIGHT PAY CARD */}
        <div className="lg:col-span-4 flex items-center">
          <PayFeesCard
            fees={data}
            onSuccess={fetchFees}
          />
        </div>
      </div>
    </div>
  );
};

export default FeesPage;
