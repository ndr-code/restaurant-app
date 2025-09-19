import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../../services/queries/restaurant';
import RestaurantCard from '../ui/restaurant-card';
import { useScreenSize } from '../../hooks';
import { Button } from '../ui/button';
import { ROUTES } from '../../config/routes';
import type { Restaurant } from '../../types/Restaurant';
import SkeletonCard from './skeleton-card';
import { Separator } from '@radix-ui/react-separator';

interface RecommendedProps {
  onToggleSearchMode?: () => void;
}

function Recommended({ onToggleSearchMode }: RecommendedProps) {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRestaurants, setDisplayedRestaurants] = useState<
    Restaurant[]
  >([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const initialLimit = isMobile ? 6 : 12;

  // Fetch restaurants with proper error handling and defaults
  const { data, isLoading, error, refetch } = useRestaurants({
    page: currentPage,
    limit: initialLimit, // Always load 12 items per page for consistency
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
  }, [data, currentPage]);

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
        <h1 className='display-md-extrabold'>Recommended</h1>
        <div className='flex items-center gap-4'>
          <p
            className='text-lg-extrabold text-foreground mt-2 cursor-pointer hover:underline'
            onClick={onToggleSearchMode}
          >
            Search
          </p>
          <Separator orientation='vertical' />
          <p
            className='text-lg-extrabold text-primary mt-2 cursor-pointer hover:underline'
            onClick={() => navigate(ROUTES.RESTAURANTS)}
          >
            See All
          </p>
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
            <p className='text-red-500'>Gagal memuat data</p>
          </div>
        )}

        {/* Restaurant Cards Grid */}
        {restaurants.length > 0 && (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
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

        {/* Empty State */}
        {!isLoading && !error && restaurants.length === 0 && (
          <div className='py-8 text-center'>
            <p className='text-gray-500'>Tidak ada restoran ditemukan</p>
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

export default Recommended;
