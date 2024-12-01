import { useAuth } from "../../authCrap/AuthProvider";
import { Link } from "react-router-dom";

const OpportunityDetails = ({ listing, handleApply }) => {
  const { user } = useAuth();

  console.log(listing);

  return (
    <div>
      <p className="text-gray-600">{listing.employers_table.name}</p>
      <img src={listing.image} alt="Job" className="w-full h-64 object-cover" />
      <p className="text-gray-700 mt-4">{listing.description}</p>
      {user && user.type === "volunteer" && (
        <div className="flex gap-2">
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => {
              const mailtoLink = `mailto:${listing.employers_table.email}?subject=${listing.title}&body=Dear%20${listing.employers_table.name}`;
              window.open(mailtoLink, "_blank"); // Open mailto in a new tab
            }}
          >
            Email
          </button>
        </div>
      )}
      {!user && (
        <p className="mt-4 text-gray-600">
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>{" "}
          to apply for this opportunity.
        </p>
      )}
    </div>
  );
};

export default OpportunityDetails;
