import { useState, useEffect } from "react";
import {
  getAppliedOpportunities,
  getAcceptedOpportunities,
  getCompletedOpportunities,
  deleteApplication,
  createAlert,
} from "../../services/api";
import FeedBackModal from "./FeedBackModal";

const VolunteerJobsList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [option, setOption] = useState("applied");
  const [job, setJob] = useState(false);

  useEffect(() => {
    if (option == "applied") {
      const fetchAppliedOpportunities = async () => {
        const opportunities = await getAppliedOpportunities(user.id);
        setJobs(opportunities);
      };
      fetchAppliedOpportunities();
    } else if (option == "accepted") {
      const fetchAcceptedOpportunities = async () => {
        const opportunities = await getAcceptedOpportunities(user.id);
        setJobs(opportunities);
      };
      fetchAcceptedOpportunities();
    } else if (option == "completed") {
      const fetchCompletedOpportunities = async () => {
        const opportunities = await getCompletedOpportunities(user.id);
        setJobs(opportunities);
      };
      fetchCompletedOpportunities();
    }
  }, [option]);

  const handleRevoke = async (job) => {
    const { id } = job;
    await deleteApplication(id);
    await createAlert({
      message: `${user.name} has unapplied from position '${job.opportunities_table.title}'`,
      user_id: job.opportunities_table.employer_id,
    });
    const newJobs = jobs.filter((job) => job.id !== id);
    setJobs(newJobs);
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
                option === "applied"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("applied")}
            >
              Applied
            </button>
            <button
              className={`px-2 py-1 text-sm rounded ${
                option === "accepted"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("accepted")}
            >
              Accepted
            </button>
            <button
              className={`px-2 py-1 text-sm rounded ${
                option === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setOption("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-8 flex flex-cols items-center justify-center">
        <div className="w-2/3">
          <div className="space-y-4">
            {jobs.length === 0 && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      No opportunities found
                    </h2>
                    <p className="text-gray-600 mt-2"></p>
                  </div>
                </div>
              </div>
            )}
            {jobs.length > 0 &&
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow p-6 border border-gray-200 flex justify-between"
                >
                  <div className="flex items-start">
                    <div className="w-24 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                      <img src={job.opportunities_table.image} alt="Job" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {job.opportunities_table.title}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {job.opportunities_table.description}
                      </p>
                    </div>
                  </div>
                  {option != "completed" && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleRevoke(job)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Revoke
                      </button>
                    </div>
                  )}
                  {option === "completed" && (
                    <div className="mt-4">
                      <button
                        onClick={() => setJob(job)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Feedback
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {job != false && <FeedBackModal job={job} setJob={setJob} />}
    </div>
  );
};

export default VolunteerJobsList;
