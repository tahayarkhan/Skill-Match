import { useAuth } from "../authCrap/AuthProvider";
import VolunteerDashboard from "../components/dashboard/VolunteerDashboard";
import OrganizationDashboard from "../components/dashboard/OrganizationDashboard";

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
        <VolunteerDashboard user={user} />
      ) : (
        <OrganizationDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;
