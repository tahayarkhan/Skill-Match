import { useState } from "react";
import { createFeedback, createAlert } from "../../services/api";

const FeedBackModal = ({ job, setJob }) => {
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async () => {
    await createFeedback({ feedback, application_id: job.id });
    await createAlert({
      message: `Feedback has been submitted for ${job.opportunities_table.title}`,
      user_id: job.opportunities_table.employer_id,
    });
    setJob(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setJob(false)}
        >
          &times;
        </button>
        <textarea
          className="w-full mt-2 p-2"
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedBackModal;
