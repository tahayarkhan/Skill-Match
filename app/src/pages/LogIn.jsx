import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authCrap/AuthProvider";

const Login = () => {
  const { loginAction } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "volunteer", // Default to 'volunteer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await loginAction(formData);
      // Handle successful login and redirect
      if (response) {
        if (response.message) {
          setSuccessMessage(response.message);
        }

        // Redirect based on user type
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      // Display error message
      setError(
        err.response?.data?.detail || "Failed to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Back to Home
        </button>
      </form>
    </div>
  );
};

export default Login;
