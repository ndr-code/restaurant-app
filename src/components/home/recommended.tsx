import { useRestaurants } from '../../services/queries/restaurant';
import RestaurantCard from '../ui/restaurant-card';
import { useScreenSize } from '../../hooks';

function Recommended() {
  const { isMobile } = useScreenSize();

  // Fetch restaurants with proper error handling and defaults
  const { data, isLoading, error } = useRestaurants({
    page: 1,
    limit: isMobile ? 6 : 12,
  });

  const restaurants = data?.restaurants || [];

  return (
    <div>
      <div className='mx-auto mb-2 flex max-w-7xl flex-row items-center justify-between px-4 sm:px-6 lg:px-4'>
        <h1 className='display-md-extrabold'>Recommended</h1>
        <p className='text-lg-extrabold text-primary mt-2 cursor-pointer'>
          See All
        </p>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-4'>
        {/* Loading State */}
        {isLoading && (
          <div className='py-8 text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
            <p className='mt-2 text-gray-600'>Memuat restoran...</p>
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
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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

        {/* Empty State */}
        {!isLoading && !error && restaurants.length === 0 && (
          <div className='py-8 text-center'>
            <p className='text-gray-500'>Tidak ada restoran ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommended;
