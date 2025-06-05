import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campersSlice';
import CamperCard from '../components/CamperCard';
const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.list);
  const loading = useSelector(state => state.campers.loading);

   useEffect(() => {
    dispatch(fetchCampers());

  }, [dispatch]);

  return (
    <div className="container">
      <h2>Available Campers</h2>
       {loading ? (
        <p className="text-gray-600">Loading campers...</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-8 gap-x-6">
          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
           
          ))}
        </div>
      )}
    </div>
  )
}

export default CatalogPage