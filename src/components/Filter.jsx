import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  resetPage,
  setFilters,
  clearFilters,
} from "../redux/campersSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.campers.filters);

  const [location, setLocation] = useState(currentFilters.location || "");
  const [type, setType] = useState(currentFilters.type || "");
  const [options, setOptions] = useState(currentFilters.options || []);

  const handleOptionsToggle = (option) => {
    setOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const handleFilters = () => {
    const filters = { location, type, options };
    dispatch(setFilters(filters));
    dispatch(resetPage());
    dispatch(fetchCampersByFilters());
  };

  const handleClearFilters = () => {
    setLocation("");
    setType("");
    setOptions("");
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white p-6  rounded-lg border border-lightgray  mb-6 max-w-sm">
      <h2 className="text-lg font-semibold mb-6 text-main">Search Filters</h2>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-main">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full border border-lightgray px-4 py-3 focus:outline-none focus:ring-button focus:border-transparent rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-main">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-6 border border-lightgray px-4 py-3 focus:outline-none focus:ring-button focus:border-transparent rounded-lg"
        >
          <option value="">All types</option>
          <option value="panelTruck">Panel Truck</option>
          <option value="fullyIntegrated">Fully Integrated</option>
          <option value="alcove">Alcove</option>
        </select>

        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-main">
            Vehile Equipment
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["AC", "Automatic", "Kitchen", "TV", "Bathroom", "Petrol"].map(
              (opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={options.includes(opt)}
                    onChange={() => handleOptionsToggle(opt)}
                    className="w-4 h-4 border-lightgray rounded  focus:ring-button focus:ring-2"
                  />
                  <span className="text-sm text-main">{opt}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleFilters}
          className="flex-1 bg-button text-white px-4 py-3 rounded-lg hover:bg-button-hover transition-colors font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className=" border-lightgray  border px-4 py-3 rounded-lg hover:bg-badges transition-colors font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
