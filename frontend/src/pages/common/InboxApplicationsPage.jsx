import { useEffect, useState } from "react";
import { getInboxApplications } from "../../services/applicationService";
import ApplicationTable from "../../components/applications/ApplicationList";

const InboxApplicationsPage = () => {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchInbox();
  }, []);

  const fetchInbox = async () => {
    const res = await getInboxApplications();
    setApplications(res.data.applications);
  };

  const role = localStorage.getItem("role");

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        Application Inbox
      </h2>

      <ApplicationTable
        applications={applications}
        role={role}
      />

    </div>
  );
};

export default InboxApplicationsPage;