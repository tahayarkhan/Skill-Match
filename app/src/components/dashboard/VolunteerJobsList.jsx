const jobs = [
  {
    id: 1,
    title: "Volunteer at the Food Bank",
    description: "Help sort and package food donations.",
    location: "123 Main St",
    date: "2021-12-25",
    time: "12:00 PM",
    slots: 5,
    filled: 3,
    organization: "Food Bank",
    category: "Food",
    skills: ["Organization", "Teamwork", "Communication"],
  },
  {
    id: 2,
    title: "Park Cleanup",
    description: "Clean up trash and plant flowers.",
    location: "456 Elm St",
    date: "2021-12-26",
    time: "9:00 AM",
    slots: 10,
    filled: 7,
    organization: "Parks Department",
    category: "Environment",
    skills: ["Physical Strength", "Attention to Detail", "Teamwork"],
  },
  {
    id: 4,
    title: "Plant Trees",
    description: "Plant trees in the park.",
    location: "101 Pine St",
    date: "2021-12-28",
    time: "10:00 AM",
    slots: 8,
    filled: 5,
    organization: "Parks Department",
    category: "Environment",
    skills: ["Physical Strength", "Teamwork", "Attention to Detail"],
  },
];

const VolunteerJobsList = ({ user }) => {
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
                    <div className="text-sm text-gray-500 mt-2">
                      <p>
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p>
                        <strong>Date:</strong> {job.date}
                      </p>
                      <p>
                        <strong>Time:</strong> {job.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
