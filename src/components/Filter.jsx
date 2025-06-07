import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCampersByFilters, resetPage, setFilters } from '../redux/campersSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const currentFilters = useSelector(state => state.campers.filters);
    
    const [location, setLocation] = useState(currentFilters.location || '');
    const [type, setType] = useState(currentFilters.type || '');
    const [options, setOptions] = useState(currentFilters.options || []);

    const handleOptionsToggle = (option) => {
        setOptions(prev => prev.includes(option) ?
        prev.filter(opt => opt !== option):
        [...prev, option])
    }

    const handleFilters = () => {
        const filters ={location, type, options};
        dispatch(setFilters(filters))
        dispatch(resetPage())
        dispatch(fetchCampersByFilters())
    }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
        <div>
            <label htmlFor="">Location</label>
            <input type="text"
            value={location}
            onChange={e=> setLocation(e.target.value)}
            className='w-full border px-3 py-2 rounded'
            />
        </div>

        <div>
            <label htmlFor="" className='block mb-1'>Type</label>
                <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    >
                    <option value="">All</option>
                    <option value="panelTruck">Panel Truck</option>
                    <option value="fullyIntegrated">Fully Integrated</option>
                    <option value="alcove">Alcove</option>
            </select>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Amenities</label>
                 <div className="flex flex-wrap gap-2">
                    {['AC', 'Automatic', 'Kitchen', 'TV', 'Bathroom', 'Petrol'].map(opt => (
                    <label key={opt} className="flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={options.includes(opt)}
                        onChange={() => handleOptionsToggle(opt)}
                    />
                    {opt}
                </label>
                    ))}
             </div>
      </div>
        </div>

              <button
                onClick={handleFilters}
                className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover"
               >
                Apply Filters
            </button>
    </div>
  )
}

export default Filter