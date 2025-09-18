import React, { useState } from 'react';
import { useSearchRestaurants } from '../../hooks/useSearch';
import RestaurantCard from '../ui/restaurant-card';
import SkeletonCard from './skeleton-card';
import { useScreenSize } from '../../hooks';
import { Button } from '../ui/button';
import type { Restaurant } from '../../types/Restaurant';

interface SearchResultProps {
  searchQuery: string;
  onClearSearch?: () => void;
  onSearchComplete?: () => void;
}

function SearchResult({
  searchQuery,
  onClearSearch,
  onSearchComplete,
}: SearchResultProps) {
  const { isMobile } = useScreenSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRestaurants, setDisplayedRestaurants] = useState<
    Restaurant[]
  >([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const initialLimit = isMobile ? 6 : 12;

  // Fetch search results
  const { data, isLoading, error, refetch } = useSearchRestaurants({
    query: searchQuery,
    page: currentPage,
    limit: initialLimit,
  });

  // Update displayed restaurants when data changes
  React.useEffect(() => {
    if (data?.restaurants) {
      if (currentPage === 1) {
        setDisplayedRestaurants(data.restaurants);
      } else {
        setDisplayedRestaurants((prev) => [...prev, ...data.restaurants]);
      }
    }

    // Call onSearchComplete when data is loaded
    if (!isLoading && onSearchComplete) {
      onSearchComplete();
    }
  }, [data, currentPage, isLoading, onSearchComplete]);

  // Reset when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
    setDisplayedRestaurants([]);
    setIsLoadingMore(false);
  }, [searchQuery]);

  const restaurants = displayedRestaurants;
  const hasMore = data?.pagination && currentPage < data.pagination.totalPages;

  // Function to load more restaurants
  const handleShowMore = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Refetch with new page
      await refetch();
    } catch (error) {
      console.error('Error loading more restaurants:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div>
      <div className='mx-auto mb-8 flex max-w-7xl flex-row items-center justify-between px-4 sm:px-6 lg:px-4'>
        <div className='flex-1'>
          <h1 className='display-md-extrabold'>Results for '{searchQuery}'</h1>
          {!isLoading && restaurants.length > 0 && (
            <p className='mt-1 text-sm text-gray-600'>
              Found {data?.pagination?.total || restaurants.length} restaurants
            </p>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <p
            className='text-lg-extrabold text-primary cursor-pointer hover:underline'
            onClick={onClearSearch}
          >
            See All
          </p>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className='text-sm text-gray-500 underline hover:text-gray-700'
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 sm:px-6 lg:px-4'>
        {/* Loading State */}
        {isLoading && (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: initialLimit }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='py-4 text-center'>
            <p className='text-red-500'>Failed to search restaurants</p>
            <button
              onClick={() => refetch()}
              className='mt-2 text-sm text-blue-600 hover:underline'
            >
              Try again
            </button>
          </div>
        )}

        {/* Search Results Grid */}
        {restaurants.length > 0 && (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                distance={'-'}
                onClick={() =>
                  console.log('View details for:', restaurant.name)
                }
              />
            ))}
          </div>
        )}

        {/* Loading More Skeleton Cards */}
        {isLoadingMore && (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: initialLimit }).map((_, index) => (
              <SkeletonCard key={`loading-more-${index}`} />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!isLoading && !error && restaurants.length === 0 && (
          <div className='py-12 text-center'>
            <div className='mb-4'>
              <h3 className='mb-2 text-2xl font-medium text-gray-900'>
                No restaurants found
              </h3>
              <p className='mb-6 text-gray-600'>
                We couldn't find any restaurants matching "{searchQuery}". Try
                searching with different keywords.
              </p>

              {onClearSearch && (
                <Button
                  variant='outline'
                  onClick={onClearSearch}
                  className='mx-auto'
                >
                  Browse All Restaurants
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Show More Button */}
        {hasMore && (
          <Button
            variant='outline'
            className='mx-auto mt-4 px-10 py-5 shadow-lg'
            onClick={handleShowMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-gray-600'></div>
                Loading...
              </>
            ) : (
              'Show More'
            )}
          </Button>
        )}

        {/* No More Data Message */}
        {!hasMore && restaurants.length > 0 && (
          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-500'>No more restaurants to load</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
