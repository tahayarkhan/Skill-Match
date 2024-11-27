import { useEffect, useState } from "react";
import { getApplications } from "../../services/api";
import ApplicationsList from "./ApplicationList";
import ApplicationView from "./ApplicationView";

const ApplicationsModal = ({ job, onClose }) => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      /* const data = await getApplications(job.id); */
      setApplications([
        { name: "Daryl", bio: "I love brownies", age: "25" },
        { name: "John", bio: "I love brownies", age: "25" },
      ]);
    };
    fetchApplications();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {application ? (
          <ApplicationView
            application={application}
            onBack={() => setApplication(null)}
          />
        ) : (
          <ApplicationsList
            applications={applications}
            setApplication={setApplication}
            job={job}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationsModal;
