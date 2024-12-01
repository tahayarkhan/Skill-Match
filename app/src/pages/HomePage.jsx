import volunteer from "../assets/volunteer.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Volunteer Matching Platform
          </h1>
          <p className="text-lg mb-6">
            Find volunteer opportunities that match your skills and interests!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Start Now!
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <img
            src={volunteer}
            alt="Volunteer Illustration"
            className="h-auto w-full max-w-md"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
