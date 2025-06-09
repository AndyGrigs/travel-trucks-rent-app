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


const Filter = () => {
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

  const handleSearch = () => {
    dispatch(setFilters(filters));
    dispatch(fetchCampersByPage({page: 1, filters}));
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
      setLocalFilters(initialFilters); // <-- Reset local state too!
    } else {
      dispatch(setFilters(filters));
      dispatch(fetchCampersByPage({page: 1, filters}));
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white   mb-6 max-w-sm">

      <div className="mb-6">
        <label className="block mb-2  text-gray">Location</label>
        <div className="relative text-main">
          <input
            type="text"
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="Kyiv, Ukraine"
            className="w-full bg-inputs rounded-[12px]  px-[58px]  py-[18px] focus:outline-none focus:ring-button focus:border-transparent pl-10 placeholder:text-main"
          />
          
          <span className="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-text">
            <MapSvg />
          </span>
        </div>
      </div>

      {/* Equipment */}
     <div className='mb-6'>
          <h3 className='font-medium text-text mb-8'>Filters</h3>
          <h2 className='font-semibold text-[20px] mb-6'>Vehicle equipment</h2>
          <hr className='border-lightgray mb-6' />
          <div className='grid grid-cols-3 gap-2'>
            {equipmentOptions.map(option=>(
              <button
                type='button'
                key={option.key}
                onClick={()=>handleEquipmentToggle(option.key)}
                className={`flex flex-col items-center font-semibold justify-center p-3 rounded-[12px] border-2 ${
                  filters[option.key] ? 'border-button' : 'border-lightgray hover:border-grey'
                }`}
              ><div>{option.icon}</div>{option.label}</button>
            ))}
          </div>
          <h2 className='font-semibold text-[20px] mb-6'>Vehicle type</h2>
          <hr className='border-lightgray mb-6' />
          <div className='grid grid-cols-3 gap-2'>
            {camperTypes.map(type=>(
              <button
                type='button'
                key={type.key}
                onClick={()=>handleCamperTypeSelect(type.key)}
                className={`flex flex-col items-center font-semibold justify-center p-3 rounded-[12px] border-2 ${
                  filters.type === type.key ? 'border-button' : 'border-lightgray hover:border-grey'
                }`}
              >
                <div>{type.icon}</div>
                <label>{type.label}</label>
              </button>
            ))}
          </div>
      </div> 
      
        <button
          className="bg-button w-[166px] text-white text-[16px] font-medium px-[60px] py-[16px] rounded-[200px] hover:bg-button-hover transition"
        >
          Search
        </button>
      
    </form>
  );
};

export default Filter;
