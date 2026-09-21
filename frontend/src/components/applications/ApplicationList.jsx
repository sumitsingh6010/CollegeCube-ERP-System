import ApplicationCard from "./ApplicationCard";

const ApplicationList = ({ applications, role }) => {

  if (!applications || applications.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No applications found.
      </div>
    );
  }

  return (

    <div className="flex flex-col gap-5 w-full max-w-5xl bg-gray-100 p-4 rounded-xl">

      {applications.map((app) => (
        <ApplicationCard
          key={app._id}
          application={app}
          role={role}
        />
      ))}

    </div>

  );
};

export default ApplicationList;