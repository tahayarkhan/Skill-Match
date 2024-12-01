import { useState, useEffect } from "react";
import CreateJobModal from "./CreateJobModal";
import ApplicationsModal from "./ApplicationsModal";
import {
  deleteOpportunity,
  getOpenOpportunities,
  getStartedOpportunities,
  getFinishedOpportunities,
  completeOpportunity,
  startOpportunity,
} from "../../services/api";

const OrganizationJobsList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [job, setJob] = useState(false);
  const [option, setOption] = useState("open");

  useEffect(() => {
    if (option == "open") {
      const fetchOpenOpportunities = async () => {
        try {
          const opportunities = await getOpenOpportunities(user.id);
          setJobs(opportunities);
        } catch (err) {
          setJobs([]);
        }
      };
      fetchOpenOpportunities();
    } else if (option == "started") {
      const fetchStartedOpportunities = async () => {
        try {
          const opportunities = await getStartedOpportunities(user.id);
          setJobs(opportunities);
        } catch (err) {
          setJobs([]);
        }
      };
      fetchStartedOpportunities();
    } else if (option == "finished") {
      const fetchCompletedOpportunities = async () => {
        try {
          const opportunities = await getFinishedOpportunities(user.id);
          setJobs(opportunities);
        } catch (err) {
          setJobs([]);
        }
      };
      fetchCompletedOpportunities();
    }
  }, [option]);

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

  const handleComplete = async (job) => {
    await completeOpportunity(job.id);
    const updatedJobs = jobs.filter((j) => j.id !== job.id);
    setJobs(updatedJobs);
  };

  const handleStart = async (job) => {
    await startOpportunity(job.id);
    const updatedJobs = jobs.filter((j) => j.id !== job.id);
    setJobs(updatedJobs);
  };

  return (
    <div>
      <div className="flex justify-center mb-2">
        <div className="w-2/3 mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">My Opportunities</h1>
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <div className="w-2/3 mx-auto px-4">
          <div className="flex space-x-2">
            <button
              className={`px-2 py-1 text-sm rounded ${
                option === "open"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("open")}
            >
              Open
            </button>
            <button
              className={`px-2 py-1 text-sm rounded ${
                option === "started"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("started")}
            >
              Started
            </button>
            <button
              className={`px-2 py-1 text-sm rounded ${
                option === "finished"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("finished")}
            >
              Completed
            </button>
          </div>
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
                    <img src={job.image} alt="Job" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-between">
                  {job.status === "open" && (
                    <button
                      onClick={() => handleView(job)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Applications
                    </button>
                  )}
                  {job.status === "started" && (
                    <button
                      onClick={() => handleView(job)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Volunteers
                    </button>
                  )}
                  <div className="flex gap-2">
                    {job.status === "started" && (
                      <button
                        onClick={() => handleComplete(job)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Complete
                      </button>
                    )}
                    {job.status === "open" && (
                      <button
                        onClick={() => handleStart(job)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Start
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(job)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Delete
                    </button>
                  </div>
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
