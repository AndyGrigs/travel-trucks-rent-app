import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../shared/Loader';
const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.list);
  const loading = useSelector(state => state.campers.loading);

   useEffect(() => {
    dispatch(fetchCampers());

  }, [dispatch]);

  return (
    <div className="container">
       {loading ? (
        <Loader/>
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