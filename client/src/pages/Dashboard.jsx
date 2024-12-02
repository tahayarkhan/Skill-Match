import { useAuth } from "../authCrap/AuthProvider";
import VolunteerBio from "../components/dashboard/VolunteerBio";
import VolunteerJobsList from "../components/dashboard/VolunteerJobsList";
import OrganizationProfile from "../components/dashboard/OrganizationProfile";
import OrganizationJobsList from "../components/dashboard/OrganizationJobList";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {user.name}
        </h1>
      </div>
      {user.type === "volunteer" ? (
        <div>
          <VolunteerBio user={user} />
          <VolunteerJobsList user={user} />
        </div>
      ) : (
        <div>
          <OrganizationProfile user={user} />
          <OrganizationJobsList user={user} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
