import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import PrivateRoute from "./authCrap/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import NavBar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const noNavbar = ["/login", "/signup"];
  return (
    <div className="h-screen flex flex-col overflow-y-scroll">
      {!noNavbar.includes(location.pathname) && <NavBar />}
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
  );
};

export default App;
