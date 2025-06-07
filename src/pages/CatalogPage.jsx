import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampersByPage } from '../redux/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../shared/Loader';
import Button from '../shared/Button';
import Filter from '../components/Filter';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.list);
  const {list, page, loading, hasMore} = useSelector(state => state.campers);

   useEffect(() => {
    if(list.length === 0) {dispatch(fetchCampersByPage(1))};
  }, [dispatch, list]);

  const handleLoadMore = () => {
    dispatch(fetchCampersByPage(page))
  }

  return (
    <div className="container">
        <Filter/>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-8 gap-x-6">
          {campers.map(camper => (
            <CamperCard  camper={camper} />
          ))}
        </div>

          {loading && <Loader/>}

      {hasMore && !loading && (
        <div className="text-center py-5">
          <Button  text='Load More' onClick={handleLoadMore} />
        </div>
      )}

    </div>
  )
}

export default CatalogPage