const OrganizationProfile = ({ user }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-2/3 text-center">{user.mission}</div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
