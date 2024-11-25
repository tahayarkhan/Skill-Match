const VolunteerBio = ({ user }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-1/2 text-center">{user.bio}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 w-1/4">
          {user.traits.map((trait, index) => (
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
