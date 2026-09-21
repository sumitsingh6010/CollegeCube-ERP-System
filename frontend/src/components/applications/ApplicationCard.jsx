import { useState } from "react";
import ViewApplicationModal from "./ViewApplicationModal";

const ApplicationCard = ({ application, role }) => {

  const [open, setOpen] = useState(false);

  const formattedDate = new Date(application.createdAt)
    .toLocaleDateString();

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      px-6 py-5
      w-full
      transition
      duration-200
      hover:shadow-lg
      hover:ring-2
      hover:ring-blue-200
    ">

      {/* TOP ROW */}

      <div className="flex justify-between items-center mb-2">

        <h3 className="text-lg font-semibold text-gray-800">

          {role === "STUDENT"
            ? `Sent to ${application.receiverRole}`
            : application.studentId?.name || "Student"}

        </h3>

        {(role === "ADMIN" || role === "FACULTY") &&
        application.status === "PENDING" ? (

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Review
          </button>

        ) : (

          <StatusBadge status={application.status} />

        )}

      </div>


      {/* SECOND ROW */}

      <div className="flex items-center gap-4 text-sm text-gray-500">

        <span>{formattedDate}</span>

        <span className="
          px-3 py-1
          bg-gray-200
          text-gray-700
          rounded-md
          text-xs
          font-medium
        ">
          {application.subject}
           {/* {application.category} */}
        </span>

        {role === "STUDENT" && (
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 font-medium hover:underline"
          >
            View
          </button>
        )}

      </div>


      {open && (
        <ViewApplicationModal
          application={application}
          close={() => setOpen(false)}
          role={role}
        />
      )}

    </div>
  );
};


const StatusBadge = ({ status }) => {

  const styles = {
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`text-sm font-semibold px-5 py-2 rounded-xl ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default ApplicationCard;