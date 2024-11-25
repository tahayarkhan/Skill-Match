import { useState } from "react";
import VolunteerBio from "./VolunteerBio";
import VolunteerJobsList from "./VolunteerJobsList";

const VolunteerDashboard = ({ user }) => {
  return (
    <div>
      <VolunteerBio user={user} />
      <VolunteerJobsList user={user} />
    </div>
  );
};

export default VolunteerDashboard;
