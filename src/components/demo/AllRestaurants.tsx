import { useAppDispatch, useAppSelector } from '@/store';
import { useRestaurants } from '@/services/queries/restaurant';
import {
  setFilters,
  setCurrentPage,
  selectFilters,
} from '@/store/slices/restaurantSlice';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Types untuk API response yang sebenarnya
interface RestaurantFromAPI {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
}

const AllRestaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  // React Query untuk server state
  const {
    data: restaurantData,
    isLoading,
    error,
    refetch,
  } = useRestaurants(filters);

  const restaurants = restaurantData?.restaurants || [];
  const paginationMeta = restaurantData?.pagination;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setFilters({ page }));
  };

  const handleRefresh = () => {
    refetch();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
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
              {restaurants.map((restaurant) => {
                const restaurantData =
                  restaurant as unknown as RestaurantFromAPI;
                return (
                  <Card
                    key={restaurantData.id}
                    className='transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
                  >
                    {/* Restaurant Image */}
                    <div className='relative h-48 overflow-hidden rounded-t-lg'>
                      <img
                        src={
                          restaurantData.images?.[0] ||
                          '/placeholder-restaurant.jpg'
                        }
                        alt={restaurantData.name}
                        className='h-full w-full object-cover'
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/300x200?text=Restaurant';
                        }}
                      />
                      <div className='bg-opacity-90 absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium'>
                        ⭐ {restaurantData.star?.toFixed(1)}
                      </div>
                    </div>

                    <CardHeader className='pb-2'>
                      <CardTitle className='line-clamp-1 text-lg font-semibold'>
                        {restaurantData.name}
                      </CardTitle>
                      <CardDescription className='flex items-center text-sm text-gray-600'>
                        📍 {restaurantData.place}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className='space-y-3'>
                      {/* Stats */}
                      <div className='grid grid-cols-2 gap-2 text-xs'>
                        <div className='flex items-center gap-1'>
                          <span>📝</span>
                          <span>{restaurantData.reviewCount} reviews</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span>🍽️</span>
                          <span>{restaurantData.menuCount} menu</span>
                        </div>
                      </div>

                      {/* Price Range */}
                      {restaurantData.priceRange && (
                        <div className='rounded bg-gray-50 p-2'>
                          <div className='mb-1 text-xs text-gray-600'>
                            💰 Price Range:
                          </div>
                          <div className='text-sm font-medium text-green-600'>
                            {formatPrice(restaurantData.priceRange.min)} -{' '}
                            {formatPrice(restaurantData.priceRange.max)}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant='outline'
                        size='sm'
                        className='mt-3 w-full'
                        onClick={() =>
                          console.log('View details for:', restaurantData.name)
                        }
                      >
                        👀 Lihat Detail
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
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
