import { useState } from "react";

const OpportunityApplication = ({ listing, handleBack, handleClose }) => {
  const [applicationText, setApplicationText] = useState("");

  const handleSubmit = (e) => {
    alert("Application submitted!");
    handleClose(e);
  };

  return (
    <div>
      <textarea
        value={applicationText}
        onChange={(e) => setApplicationText(e.target.value)}
        placeholder="Type your application here..."
        className="w-full p-2 border rounded"
        rows="10"
      />

      <div className="flex justify-center gap-5 mt-4">
        <button
          onClick={handleBack}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OpportunityApplication;
