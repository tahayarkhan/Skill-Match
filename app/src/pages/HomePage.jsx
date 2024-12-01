import magnify from "../assets/magnify.png"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to the Volunteer Matching Platform
      </h1>
      <p className="text-lg text-center">
        Find volunteer opportunities that match your skills and interests!
      </p>
      <img src={magnify} alt=""  className="m-5 h-32"/>
    </div>
  );
};

export default Home;
