const VolunteerBio = ({ user }) => {
  //POTENTIALLY ADD BACK EXTRACTED TRAITS
  //!!!REVIEW
  return (
    <div className="mb-8 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-4">
        <div className="w-1/2 text-center">
          <p className="text-gray-600 text-lg">
          {user.skills}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 w-1/4">
          {false &&
            user.skills.map((trait, index) => (
              <div key={index} className="bg-blue-100 text-blue-600 border border-blue-300 rounded-full px-4 py-1 text-sm font-medium shadow-sm">
                {trait}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerBio;
