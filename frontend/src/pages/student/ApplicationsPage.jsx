import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/applicationService";
import ApplicationTable from "../../components/applications/ApplicationList";
import SendApplicationModal from "../../components/applications/SendApplicationModal";

const ApplicationsPage = () => {

  const [applications, setApplications] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const res = await getStudentApplications();
    setApplications(res.data.applications);
  };

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h2 className="text-xl font-semibold">
          My Applications
        </h2>

        <button
          onClick={() => setModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send Application
        </button>

      </div>

      <ApplicationTable
        applications={applications}
        role="STUDENT"
      />

      {modal && (
        <SendApplicationModal
          close={() => setModal(false)}
          refresh={fetchApps}
        />
      )}

    </div>
  );
};

export default ApplicationsPage;