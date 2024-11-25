import OpportunityCard from "./OpportunityCard";

const Listings = ({ listings }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Volunteering Opportunities
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <OpportunityCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Listings;
