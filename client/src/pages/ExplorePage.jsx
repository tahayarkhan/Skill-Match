import { useState, useEffect } from "react";
import { useAuth } from "../authCrap/AuthProvider";
import Filters from "../components/explore/Filters";
import Listings from "../components/explore/Listings";
import SearchBar from "../components/explore/SearchBar";
import Toggle from "../components/explore/Toggle";
import {
  getRankedOpportunities,
  getFilteredRankedOpportunities,
  getOpportunities,
} from "../services/api";

const ExplorePage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        let response;
        if (user && user.type === "volunteer") {
          response = await getFilteredRankedOpportunities({
            skills: user.skills,
            filters: filters,
            search,
          });
          response = response.ranked_opportunities;

          /* if (filters.length == 0) {
            response = await getRankedOpportunities({ skills: user.skills });
            response = response.ranked_opportunities;
          } else {
            response = await getFilteredRankedOpportunities({
              skills: user.skills,
              filters: filters,
              search,
            });
            response = response.ranked_opportunities;
          } */
        } else {
          response = await getOpportunities();
        }
        setListings(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOpportunities();
  }, [filters, search]);

  return (
    <div className="flex h-full w-full">
      {user && user.type === "volunteer" && (
        <div className="w-1/4 h-full p-4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      )}
      <div className="w-full p-4">
        {user && user.type === "volunteer" && (
          <div className="flex gap-6">
            <SearchBar setSearch={setSearch} search={search} />
            <Toggle setListings={setListings} />
          </div>
        )}
        <Listings listings={listings} />
      </div>
    </div>
  );
};

export default ExplorePage;
