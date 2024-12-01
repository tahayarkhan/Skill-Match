const Filters = ({ filters, setFilters, show }) => {
  const qualities = [
    "Teamwork",
    "Independence",
    "Public Speaking",
    "Leadership",
    "Problem Solving",
    "Creativity",
    "Critical Thinking",
    "Adaptability",
    "Communication",
    "Time Management",
    "Organization",
    "Research",
    "Technical Skills",
    "Interpersonal Skills",
    "Writing",
    "Math",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Dance",
    "Cooking",
    "Photography",
    "Videography",
    "Graphic Design",
    "Robotics",
  ];
  return (
    <div className="h-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="mb-3">Filters</h2>
      {show > 0 && (
        <div className="flex flex-wrap gap-2">
          {qualities.map((quality) => (
            <button
              key={quality}
              className={`px-3 py-1 rounded-full border bg-gray-200 text-gray-700 text-xs`}
            >
              {quality}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
