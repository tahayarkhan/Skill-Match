import { useState } from "react";

const Toggle = ({ setListings }) => {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setListings((prevListings) => [...prevListings].reverse());
  };

  return (
    <div className="flex items-center">
      <div
        className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isToggled ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            isToggled ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-3 text-gray-700">
        {isToggled ? "Strengthen Skills" : "Expand Skills"}
      </span>
    </div>
  );
};

export default Toggle;
