import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Change to useNavigate
import { useAuth } from "../authCrap/AuthProvider";
import ai from "../assets/ai.png";
import { enhanceBio } from "../services/api";

const SignUp = () => {
  const { signUpAction } = useAuth();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    phone: "",
    userType: "volunteer",
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

    // Password validation
    if (formData.password.length < 8 || formData.password.length > 64) {
      setError("Password must be between 8 and 64 characters.");
      setLoading(false);
      return;
    }

    try {
      await signUpAction(formData);
      setSuccessMessage(
        "Sign up successful! Please check your email for confirmation."
      );
    } catch (err) {
      setError("Failed to sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAI = async () => {
    const enhancedSkills = await enhanceBio({ bio: formData.skills });
    setFormData({ ...formData, skills: enhancedSkills });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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

        {formData.userType === "volunteer" && (
          <div className="relative">
            <textarea
              name="skills"
              placeholder="Your Skills/Interests"
              value={formData.skills}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
            />
            <div className="absolute bottom-1 right-1 w-8 h-8 m-2 rounded-full hover:bg-gray-200 flex justify-center items-center">
              <img onClick={handleAI} src={ai} alt="AI" className="w-6 h-6" />
            </div>
          </div>
        )}

        {formData.userType === "employer" && (
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

        <div className="mb-4">
          <label>
            <input
              type="radio"
              name="userType"
              value="volunteer"
              checked={formData.userType === "volunteer"}
              onChange={handleChange}
            />
            Volunteer
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="userType"
              value="employer"
              checked={formData.userType === "employer"}
              onChange={handleChange}
            />
            Employer
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log In
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

export default SignUp;
