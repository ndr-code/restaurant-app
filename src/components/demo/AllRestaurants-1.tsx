import { useAppDispatch, useAppSelector } from '@/store';
import { useRestaurants } from '@/services/queries/restaurant';
import {
  setFilters,
  setCurrentPage,
  selectFilters,
} from '@/store/slices/restaurantSlice';
import { Button } from '../ui/button';
import RestaurantCard from '../ui/restaurant-card';

const AllRestaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  // Ensure filters have proper defaults to prevent API issues
  const safeFilters = {
    page: filters?.page || 1,
    limit: filters?.limit || 12,
    ...filters,
  };

  // React Query untuk server state
  const {
    data: restaurantData,
    isLoading,
    error,
    refetch,
  } = useRestaurants(safeFilters);

  const restaurants = restaurantData?.restaurants || [];
  const paginationMeta = restaurantData?.pagination;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setFilters({ page }));
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-6xl'>
        {/* Error State */}
        {error && (
          <div className='mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700'>
            <div className='flex items-center'>
              <span className='mr-2 text-red-500'>⚠️</span>
              <div>
                <p className='font-medium'>Error:</p>
                <p className='text-sm'>{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className='py-8 text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
            <p className='mt-2 text-gray-600'>Memuat restoran...</p>
          </div>
        )}

        {/* Restaurants Grid */}
        {restaurants.length > 0 && (
          <div className='space-y-6'>
            {/* Header dengan Pagination */}
            <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
              <div className='flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
                <Button
                  onClick={handleRefresh}
                  variant='outline'
                  disabled={isLoading}
                  className='flex items-center gap-2'
                >
                  {isLoading ? '⏳' : '🔄'}
                  {isLoading ? 'Memuat...' : 'Refresh'}
                </Button>

                {/* Pagination Info */}
                {paginationMeta && paginationMeta.totalPages > 1 && (
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-gray-600'>
                      Page {paginationMeta.page} of {paginationMeta.totalPages}
                    </span>
                    <div className='flex gap-1'>
                      {paginationMeta.page > 1 && (
                        <Button
                          onClick={() =>
                            handlePageChange(paginationMeta.page - 1)
                          }
                          variant='outline'
                          size='sm'
                        >
                          ← Prev
                        </Button>
                      )}
                      {paginationMeta.page < paginationMeta.totalPages && (
                        <Button
                          onClick={() =>
                            handlePageChange(paginationMeta.page + 1)
                          }
                          variant='outline'
                          size='sm'
                        >
                          Next →
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Restaurant Cards Grid */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
          </div>
        )}

        {/* Empty State */}
        {restaurants.length === 0 && !isLoading && !error && (
          <div className='py-16 text-center'>
            <div className='mb-4 text-gray-400'>
              <div className='mb-4 text-6xl'>🍽️</div>
            </div>
            <h3 className='mb-2 text-xl font-medium text-gray-900'>
              Tidak ada restoran ditemukan
            </h3>
            <p className='mb-6 text-gray-600'>
              Coba refresh atau periksa koneksi internet Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
