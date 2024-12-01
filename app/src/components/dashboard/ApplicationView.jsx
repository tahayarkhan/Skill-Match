import { acceptApplication, createAlert } from "../../services/api";

const ApplicationView = ({ application, onBack, job }) => {
  const handleAccept = async () => {
    await acceptApplication(application.id);
    await createAlert({
      message: `Your application for ${job.title} has been accepted`,
      user_id: application.user_id,
    });
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
        <div className="flex gap-2">
          <button
            onClick={() => {
              const mailtoLink = `mailto:${application.volunteers_table.email}?subject=${job.title}&body=Dear%20${application.volunteers_table.name}`;
              window.open(mailtoLink, "_blank"); // Open mailto in a new tab
            }}
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
          >
            Email
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;
