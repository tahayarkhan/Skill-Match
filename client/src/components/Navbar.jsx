import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authCrap/AuthProvider";
import Alert from "../assets/bell.png";
import AlertsPopUp from "./AlertsPopUp";

// used to access user state and logut function from auth provider
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 flex justify-center relative">
      <div className="absolute left-6 text-white text-lg font-bold">Skill Match</div>
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
          
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>

          <li>
            <Link to="/explore" className="text-white hover:text-gray-400">
              Explore
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-400">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="absolute right-6">
        {user ? (
          <div className="flex gap-3 items-center">
            <img
              src={Alert}
              alt="alert"
              onClick={() => setShowAlerts(!showAlerts)}
              className="w-5 h-5 invert cursor-pointer hover:filter hover:invert-0 hover:brightness-50"
            />
            <button onClick={logOut} className="text-white hover:text-gray-400">
              Log Out
            </button>
          </div>
        ) : (
          // link to 
          <Link to="/login" className="text-white hover:text-gray-400">
            Log In
          </Link>
        )}
      </div>
      {showAlerts && <AlertsPopUp onClose={() => setShowAlerts(false)} />}
    </nav>
  );
};

export default Navbar;
