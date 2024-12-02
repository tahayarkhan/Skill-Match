import { useEffect, useState } from "react";
import {
  getOpenApplications,
  getAcceptedApplications,
  getFinishedApplications,
} from "../../services/api";
import ApplicationsList from "./ApplicationList";
import ApplicationView from "./ApplicationView";

const ApplicationsModal = ({ job, onClose, option }) => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (option === "open") {
        const data = await getOpenApplications(job.id);
        setApplications(data);
      } else if (option === "started") {
        const data = await getAcceptedApplications(job.id);
        setApplications(data);
      } else if (option === "finished") {
        const data = await getFinishedApplications(job.id);
        setApplications(data);
      }
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
            job={job}
            setApplications={setApplications}
            option={option}
          />
        ) : (
          <ApplicationsList
            applications={applications}
            setApplication={setApplication}
            setApplications={setApplications}
            job={job}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationsModal;
