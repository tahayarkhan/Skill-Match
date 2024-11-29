const ApplicationOption = ({ application, setApplication }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg w-full mx-auto my-4 flex justify-between">
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {application.volunteers_table.name}
        </h3>
        <p className="text-gray-600">{application.volunteers_table.email}</p>
      </div>
      <button
        onClick={() => setApplication(application)}
        className="px-4 py-2 h-12 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        View
      </button>
    </div>
  );
};

export default ApplicationOption;
