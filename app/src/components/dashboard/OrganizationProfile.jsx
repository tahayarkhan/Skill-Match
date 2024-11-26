const OrganizationProfile = ({ user }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-1/2 text-center">{user.bio}</div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
