import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampersByPage } from '../redux/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../shared/Loader';
import Button from '../shared/Button';
import Filter from '../components/Filter';

const CatalogPage = () => {
  const dispatch = useDispatch();
  // const campers = useSelector(state => state.campers.list);
  const {list, page, loading, hasMore, error} = useSelector(state => state.campers);

   useEffect(() => {
    if(list.length === 0) {dispatch(fetchCampersByPage(1))};
  }, [dispatch, list]);

  const handleLoadMore = () => {
    dispatch(fetchCampersByPage(page))
  }

  return (
    <div className="container">
        <Filter/>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Something went wrong: {error}
        </div>
      )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-8 gap-x-6">
          {list.map(camper => (
            <CamperCard key={camper.id}  camper={camper} />
          ))}
        </div>

        {!loading && list.length === 0 && (
        <p className="text-center text-gray-500 col-span-full">
          There is nothing to show you!
        </p>
      )}

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