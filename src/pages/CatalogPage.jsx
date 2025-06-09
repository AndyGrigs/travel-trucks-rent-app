import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersByPage } from "../redux/campersSlice";
import CamperCard from "../components/CamperCard";
import Loader from "../shared/Loader";
import Button from "../shared/Button";
import Filter from "../components/Filter";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, page, loading, hasMore, error, filters } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchCampersByPage({page: 1, filters}));
    }
  }, [dispatch, list.length, filters]);

  const handleLoadMore = () => {
    dispatch(fetchCampersByPage({page, filters}));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex gap-8">
        <div className="w-80 flex-shrink-0">
          <Filter />
        </div>

        <div className="flex-1">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              Something went wrong...{error}
            </div>
          )}

          <div className="space-y-6 lg:space-y-8">
            {list.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {!loading && list.length === 0 && (
            <div className="text-center py-12">
              <p className="text-center text-gray text-lg">
                No campers matching your criteria.
              </p>
              <p className="text-text mt-2">Try changing your filters or search terms.</p>
            </div>
          )}

          {loading && <Loader />}

          {hasMore && !loading && list.length > 0 && (
            <div className="text-center py-5">
              <Button text="Load More" onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
