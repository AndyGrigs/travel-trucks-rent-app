import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  resetPage,
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


const Filter = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.campers.filters);
  const [location, setLocation] = useState(currentFilters.location || "");

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
    {key: 'panelTruck', label: 'Van', icon: <AlgoFilterSvg/>},
  ]

  const handleEquipmentToggle = (key)=>{
    const newFilters = {
      ...currentFilters, 
      [key]: !currentFilters[key]
    }
    dispatch(setFilters(newFilters))
  }

  const handleCamperTypeSelect = (type)=>{
    const newFilters = {
      ...currentFilters, 
      form: currentFilters.form === type ? ' ' : type
    }
    dispatch(setFilters(newFilters))
  }

 const handleSearch = () => {
  const filters = {...currentFilters, location}
  dispatch(setFilters(filters))
  dispatch(fetchCampersByPage({page: 1, filters}))
 }

 const handleClearFilters = ()=> {
  setLocation("");
  dispatch(clearFilters());
 }
  
  return (
    <div className="bg-white   mb-6 max-w-sm">

      <div className="mb-6">
        <label className="block mb-2  text-gray">Location</label>
        <div className="relative text-main">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
                key={option.key}
                onClick={handleEquipmentToggle(option.key)}
                className={`flex flex-col items-center justify-center p-3 rounded-[12px]`}
              ><div>{option.icon}</div>{option.label}</button>
            ))}
          </div>
      </div> 

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
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
