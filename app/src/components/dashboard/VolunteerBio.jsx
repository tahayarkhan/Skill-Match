const VolunteerBio = ({ user }) => {
  //POTENTIALLY ADD BACK EXTRACTED TRAITS
  //!!!REVIEW
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-1/2 text-center">{user.skills}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 w-1/4">
          {false &&
            user.skills.map((trait, index) => (
              <div key={index} className="bg-blue-300 rounded-full px-2">
                {trait}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerBio;
