import ApplicationOption from "./ApplicationOption";

const ApplicationsList = ({
  applications,
  setApplication,
  setApplications,
  job,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">{job.title} Applications</h2>
      {applications &&
        applications.map((application) => {
          return (
            <ApplicationOption
              key={application.id}
              application={application}
              setApplication={setApplication}
              setApplications={setApplications}
            />
          );
        })}
    </div>
  );
};

export default ApplicationsList;
