import { useState, useEffect } from "react";
import {
  getAppliedOpportunities,
  deleteApplication,
  createAlert,
} from "../../services/api";

const VolunteerJobsList = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedOpportunities = async () => {
      const opportunities = await getAppliedOpportunities(user.id);
      setJobs(opportunities);
    };

    fetchAppliedOpportunities();
  }, []);

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
      <div className="flex justify-center">
        <div className="w-2/3 mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Jobs Applied To</h1>
        </div>
      </div>
      <div className="mx-auto px-4 py-8 flex flex-cols items-center justify-center">
        <div className="w-2/3">
          <div className="space-y-4">
            {jobs.map((job) => (
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
                <div className="mt-4">
                  <button
                    onClick={() => handleRevoke(job)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerJobsList;
