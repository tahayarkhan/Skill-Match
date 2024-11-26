import { useState } from "react";
import AI from "../../assets/ai.png";
import { enhanceApplication, applyForOpportunity } from "../../services/api";

const OpportunityApplication = ({ listing, handleBack, handleClose }) => {
  const [applicationText, setApplicationText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForOpportunity({
        opportunity: listing.id,
        text: applicationText,
      });
      alert("Application submitted!");
      handleClose(e);
    } catch (error) {
      console.error("Failed to submit application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const handleEnhance = async () => {
    try {
      const res = await enhanceApplication(applicationText);
      setApplicationText(res.data);
    } catch (error) {
      console.error("Failed to enhance application:", error);
      alert("Failed to enhance application. Please try again.");
    }
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
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex gap-2"
          onClick={handleEnhance}
        >
          Enhance
          <img src={AI} className="w-6" />
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
