import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersByPage } from "../redux/campersSlice";
import CamperCard from "../components/CamperCard";
import Loader from "../shared/Loader";
import Button from "../shared/Button";
import Filter from "../components/Filter";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, page, loading, hasMore, filters } = useSelector(
    (state) => state.campers
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchCampersByPage({page: 1, filters}));
    }
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(fetchCampersByPage({page, filters}));
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleMobileFilter}
          className="w-full bg-button text-white font-medium py-3 px-4 rounded-lg hover:bg-button-hover transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters & Search
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-4">
            <Filter />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileFilter}></div>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-lightgray p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-main">Filters & Search</h2>
                <button
                  onClick={toggleMobileFilter}
                  className="p-2 hover:bg-badges rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <Filter onFilterApply={() => setIsMobileFilterOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <p className="text-sm text-gray">
                {list.length > 0 ? `Showing ${list.length} campers` : 'No campers found'}
              </p>
              {list.length > 0 && (
                <p className="text-sm text-gray">
                  {hasMore ? 'Load more to see additional results' : 'All results shown'}
                </p>
              )}
            </div>
          </div>

          {/* Camper Cards */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {list.map((camper, idx) => (
              <CamperCard 
                key={typeof camper.id === "string" || typeof camper.id === "number" ? camper.id : idx} 
                camper={camper} 
              />
            ))}
          </div>

          {/* No Results State */}
          {!loading && list.length === 0 && (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.069M15 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold text-main mb-2">
                  No campers found
                </h3>
                <p className="text-gray text-sm sm:text-base mb-4">
                  No campers matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={toggleMobileFilter}
                  className="lg:hidden bg-button text-white px-6 py-2 rounded-lg hover:bg-button-hover transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && <Loader />}

          {/* Load More Button */}
          {hasMore && !loading && list.length > 0 && (
            <div className="text-center py-6 sm:py-8">
              <Button text="Load More" onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;   