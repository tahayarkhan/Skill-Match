import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import PrivateRoute from "./authCrap/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import NavBar from "./components/Navbar";
// define app, use routes to seth paths
const App = () => {

  const location = useLocation();
  const noNavbar = ["/login", "/signup"];
  return (
    <div className="flex flex-col min-h-screen">
      {!noNavbar.includes(location.pathname) && <NavBar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>2024 SKILL MATCH. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;
