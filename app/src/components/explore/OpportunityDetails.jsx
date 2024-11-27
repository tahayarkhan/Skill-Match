import { useAuth } from "../../authCrap/AuthProvider";

const OpportunityDetails = ({ listing, handleApply }) => {
  const { user } = useAuth();

  return (
    <div>
      <p className="text-gray-600">{listing.company}</p>
      <p className="text-gray-500">{listing.location}</p>
      <p className="text-gray-700 mt-4">{listing.description}</p>
      {user && user.type === "volunteer" && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleApply}
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default OpportunityDetails;
