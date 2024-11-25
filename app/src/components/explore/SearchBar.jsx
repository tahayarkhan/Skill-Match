const SearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-full p-2 border border-gray-300">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-white focus:outline-none px-4 rounded-full"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
