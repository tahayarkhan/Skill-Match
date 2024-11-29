import { useState, useEffect } from "react";
import CreateJobModal from "./CreateJobModal";
import ApplicationsModal from "./ApplicationsModal";
import { getCreatedOpportunities, deleteOpportunity } from "../../services/api";

const OrganizationJobsList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [job, setJob] = useState(false);

  const handleAddJob = () => {
    setShowCreateModal(true);
  };

  const handleView = (job) => {
    setJob(job);
  };

  const handleDelete = async (job) => {
    await deleteOpportunity(job.id);
    const updatedJobs = jobs.filter((j) => j.id !== job.id);
    setJobs(updatedJobs);
  };

  useEffect(() => {
    const fetchAppliedOpportunities = async () => {
      const opportunities = await getCreatedOpportunities(user.id);
      setJobs(opportunities);
    };

    fetchAppliedOpportunities();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-2/3 mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Created Jobs</h1>
        </div>
      </div>
      <div className="mx-auto px-4 py-8 flex flex-cols items-center justify-center">
        <div className="w-2/3">
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow p-6 border border-gray-200"
              >
                <div className="flex items-start">
                  <div className="w-24 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                    <img src="https://via.placeholder.com/150" alt="Job" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-between">
                  <button
                    onClick={() => handleView(job)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => handleDelete(job)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleAddJob}
          className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
      {showCreateModal && (
        <CreateJobModal onClose={() => setShowCreateModal(false)} />
      )}
      {job && <ApplicationsModal job={job} onClose={() => setJob(false)} />}
    </div>
  );
};

export default OrganizationJobsList;
