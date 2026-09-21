import { updateApplicationStatus } from "../../services/applicationService";

const ViewApplicationModal = ({ application, close, role }) => {

  const handleAction = async (status) => {

    await updateApplicationStatus({
      applicationId: application._id,
      status,
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-lg font-semibold mb-4">
          Application
        </h2>

        <p className="mb-2">
          <strong>Subject:</strong> {application.subject}
        </p>

        <p className="mb-4">{application.message}</p>

        {(role === "ADMIN" || role === "FACULTY") &&
          application.status === "PENDING" && (

            <div className="flex justify-end gap-3">

              <button
                onClick={() => handleAction("APPROVED")}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleAction("REJECTED")}
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Reject
              </button>

            </div>

          )}

      </div>

    </div>
  );
};

export default ViewApplicationModal;