import ReactDOM from "react-dom";
import { useState } from "react";
import { useAuth } from "../../authCrap/AuthProvider";
import { useNavigate } from "react-router-dom";
import OpportunityDetails from "./OpportunityDetails";
import OpportunityApplication from "./OpportunityApplication";

const OpportunityModal = ({ listing, handleClose }) => {
  const [application, setApplication] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!application) {
      setApplication(true);
      return;
    }
  };
  const handleBack = () => {
    setApplication(false);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold">{listing.title}</h2>
        {application ? (
          <OpportunityApplication
            listing={listing}
            handleBack={handleBack}
            handleClose={handleClose}
          />
        ) : (
          <OpportunityDetails listing={listing} handleApply={handleApply} />
        )}
      </div>
    </div>,
    document.body // Mount the modal directly into the <body> element
  );
};

export default OpportunityModal;
