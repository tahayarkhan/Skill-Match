import ApplicationOption from "./ApplicationOption";

const ApplicationsList = ({ applications, setApplication, job }) => {
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
            />
          );
        })}
    </div>
  );
};

export default ApplicationsList;
