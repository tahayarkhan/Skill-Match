import { useState, useEffect } from "react";
import { useAuth } from "../authCrap/AuthProvider";
import Filters from "../components/explore/Filters";
import Listings from "../components/explore/Listings";
import SearchBar from "../components/explore/SearchBar";
import Toggle from "../components/explore/Toggle";
import { getRankedOpportunities, getOpportunities } from "../services/api";

const ExplorePage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});

  //Real
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        let response;
        if (user && user.type === "volunteer") {
          response = await getRankedOpportunities();
        } else {
          response = await getOpportunities();
        }
        setListings(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOpportunities();
  }, [filters]);

  //Mock
  useEffect(() => {
    setListings([
      {
        id: 1,
        title: "Volunteer at the Food Bank",
        description: "Help sort and package food donations.",
        location: "123 Main St",
        date: "2021-12-25",
        time: "12:00 PM",
        slots: 5,
        filled: 3,
        organization: "Food Bank",
        category: "Food",
        skills: ["Organization", "Teamwork", "Communication"],
      },
      {
        id: 2,
        title: "Park Cleanup",
        description: "Clean up trash and plant flowers.",
        location: "456 Elm St",
        date: "2021-12-26",
        time: "9:00 AM",
        slots: 10,
        filled: 7,
        organization: "Parks Department",
        category: "Environment",
        skills: ["Physical Strength", "Attention to Detail", "Teamwork"],
      },
      {
        id: 3,
        title: "Read to Kids",
        description: "Read books to children at the library.",
        location: "789 Oak St",
        date: "2021-12-27",
        time: "3:00 PM",
        slots: 4,
        filled: 2,
        organization: "Library",
        category: "Education",
        skills: ["Reading", "Patience", "Public Speaking"],
      },
    ]);
  }, []);

  return (
    <div className="flex h-full w-full">
      <div className="w-1/4 h-full p-4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className="w-full p-4">
        <div className="flex gap-6">
          <SearchBar setFilters={setFilters} />
          {user && user.type === "volunteer" && (
            <Toggle setListings={setListings} />
          )}
        </div>
        <Listings listings={listings} />
      </div>
    </div>
  );
};

export default ExplorePage;
