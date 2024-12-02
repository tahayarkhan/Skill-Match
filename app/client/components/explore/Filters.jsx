import { useEffect, useState } from "react";
import { getTraits } from "../../services/api";

const Filters = ({ setFilters }) => {
  const [traits, setTraits] = useState([]); // Store all traits
  const [selectedTraits, setSelectedTraits] = useState([]); // Track selected traits

  useEffect(() => {
    const fetchTraits = async () => {
      const traits = await getTraits();
      setTraits(traits);
    };
    fetchTraits();
  }, []);

  const handleTraitToggle = (traitId) => {
    // Toggle trait selection
    const updatedTraits = selectedTraits.includes(traitId)
      ? selectedTraits.filter((id) => id !== traitId) // Deselect
      : [...selectedTraits, traitId]; // Select

    setSelectedTraits(updatedTraits);
    setFilters(updatedTraits); // Pass updated filters to parent component
  };

  return (
    <div className="h-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="mb-3">Filters</h2>

      <div className="flex flex-wrap gap-2">
        {traits.map((trait) => (
          <button
            key={trait.id}
            onClick={() => handleTraitToggle(trait.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
              ${
                selectedTraits.includes(trait.id)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-200 text-gray-700 border-gray-300"
              }
            `}
          >
            {trait.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
