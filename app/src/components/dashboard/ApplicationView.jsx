import { acceptApplication } from "../../services/api";

const ApplicationView = ({ application, onBack }) => {
  const handleAccept = async () => {
    await acceptApplication(application.id);
    onBack();
  };

  return (
    <div className="p-5 border border-gray-300 rounded max-w-sm mx-auto">
      {/*    <div className="text-xl font-bold mb-2">
        {application.volunteers_table.name}
      </div> */}
      <div className="text-gray-600 mb-4">{application.entry}</div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ApplicationView;
