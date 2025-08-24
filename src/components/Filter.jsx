import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearFilters,
  fetchCampersByPage,
} from "../redux/campersSlice";
import ACSvg from '../shared/ACSvg';
import AutomaticSvg from '../shared/AutomaticSvg';
import TVSvg from '../shared/TVSvg';
import KitchenSvg from '../shared/KitchenSvg';
import BathroomSvg from '../shared/BathroomSvg';
import VanFilterSvg from '../shared/VanFilterSvg';
import FullyFilterSvg from '../shared/FullyFilterSvg'
import AlgoFilterSvg from '../shared/AlgoFilterSvg'
import MapSvg from '../shared/MapSvg';

const initialFilters = {
  location: "",
  type: "",
  form: "",
  AC: false,
  automatic: false,
  kitchen: false,
  TV: false,
  bathroom: false,
};

const Filter = ({ onFilterApply }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.campers.filters);
  const [filters, setLocalFilters] = useState(currentFilters);

  const equipmentOptions = [
    {key: 'AC', label: 'AC', icon: <ACSvg/>},
    {key: 'automatic', label: 'Automatic', icon: <AutomaticSvg/>},
    {key: 'kitchen', label: 'Kitchen', icon: <KitchenSvg/>},
    {key: 'TV', label: 'TV', icon: <TVSvg/>},
    {key: 'bathroom', label: 'Bathroom', icon: <BathroomSvg/>},
  ]

  const camperTypes = [
    {key: 'panelTruck', label: 'Van', icon: <VanFilterSvg/>},
    {key: 'fullyIntegrated', label: 'Fully Integrated', icon: <FullyFilterSvg/>},
    {key: 'alcove', label: 'Alcove', icon: <AlgoFilterSvg/>},
  ]

  const handleEquipmentToggle = (key) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
       
  const handleCamperTypeSelect = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      type: prev.type === type ? "" : type
    }));
  };

  const handleLocationChange = (e) => {
    setLocalFilters(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const isFiltersEmpty = (filtersObj) => {
    return Object.entries(initialFilters).every(
      ([key, value]) => filtersObj[key] === value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFiltersEmpty(filters)) {
      dispatch(clearFilters());
      setLocalFilters(initialFilters);
    } else {
      dispatch(setFilters(filters));
      dispatch(fetchCampersByPage({page: 1, filters}));
    }
    
    // Close mobile filter modal if callback provided
    if (onFilterApply) {
      onFilterApply();
    }
  };

  const handleClearFilters = () => {
    setLocalFilters(initialFilters);
    dispatch(clearFilters());
    dispatch(fetchCampersByPage({page: 1, filters: initialFilters}));
    
    if (onFilterApply) {
      onFilterApply();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-white">
        {/* Location Input */}
        <div className="mb-6">
          <label className="block mb-3 text-gray text-sm sm:text-base font-medium">
            Location
          </label>
          <div className="relative text-main">
            <input
              type="text"
              value={filters.location}
              onChange={handleLocationChange}
              placeholder="City, Country"
              className="w-full bg-inputs rounded-xl px-12 sm:px-14 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent placeholder:text-main"
            />
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-text">
              <MapSvg />
            </span>
          </div>
        </div>

        {/* Filters Section */}
        <div className='mb-6'>
          <h3 className='font-medium text-text mb-6 text-sm sm:text-base'>Filters</h3>
          
          {/* Vehicle Equipment */}
          <h2 className='font-semibold text-lg sm:text-xl mb-4 sm:mb-6 text-main'>
            Vehicle equipment
          </h2>
          <hr className='border-lightgray mb-4 sm:mb-6' />
          
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8'>
            {equipmentOptions.map(option => (
              <button
                type='button'
                key={option.key}
                onClick={() => handleEquipmentToggle(option.key)}
                className={`flex flex-col items-center font-medium justify-center p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 text-xs sm:text-sm ${
                  filters[option.key] 
                    ? 'border-button bg-button bg-opacity-5' 
                    : 'border-lightgray hover:border-gray hover:bg-badges'
                }`}
              >
                <div className="mb-1 sm:mb-2">{option.icon}</div>
                <span className="text-center leading-tight">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Vehicle Type */}
          <h2 className='font-semibold text-lg sm:text-xl mb-4 sm:mb-6 text-main'>
            Vehicle type
          </h2>
          <hr className='border-lightgray mb-4 sm:mb-6' />
          
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8'>
            {camperTypes.map(type => (
              <button
                type='button'
                key={type.key}
                onClick={() => handleCamperTypeSelect(type.key)}
                className={`flex flex-col sm:flex-col items-center font-medium justify-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-sm ${
                  filters.type === type.key 
                    ? 'border-button bg-button bg-opacity-5' 
                    : 'border-lightgray hover:border-gray hover:bg-badges'
                }`}
              >
                <div className="mb-2">{type.icon}</div>
                <span className="text-center">{type.label}</span>
              </button>
            ))}
          </div>
        </div> 
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            className="flex-1 bg-button text-white text-sm sm:text-base font-medium px-6 py-3 sm:py-4 rounded-full hover:bg-button-hover transition-colors duration-200"
          >
            Search
          </button>
          
          <button
            type="button"
            onClick={handleClearFilters}
            className="flex-1 sm:flex-initial bg-transparent text-button border-2 border-button text-sm sm:text-base font-medium px-6 py-3 sm:py-4 rounded-full hover:bg-button hover:text-white transition-all duration-200"
          >
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;  