import { Link } from "react-router-dom";
import { useAuth } from "../authCrap/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-center relative">
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
          <button onClick={logOut} className="text-white hover:text-gray-400">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-400">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
