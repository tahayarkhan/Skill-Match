import volunteer from "../assets/volunteer.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between h-screen p-4 lg:p-12 relative overflow-hidden">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left space-y-6 mt-20 lg:mt-0"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-600">
            Welcome to the Volunteer Matching Platform
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Find volunteer opportunities that match your skills and interests!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Start Now!
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center mt-8 lg:mt-0 flex-1"
        >
          <img
            src={volunteer}
            alt="Volunteer Illustration"
            className="w-full max-w-md lg:max-w-lg"
          />
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-[-56px] left-0 w-full h-1/4 bg-gradient-to-t from-blue-300 to-transparent pointer-events-none z-[-1]"></div>    
    </>
  );
};

export default Home;
