import { useEffect, useState } from "react";
import AttendancePopup from "../../components/attendance/AttendancePopup";

const AttendancePage = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <>
      {showPopup && (
        <AttendancePopup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default AttendancePage;
