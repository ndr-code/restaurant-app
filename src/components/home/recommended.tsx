import { useScreenSize } from '../../hooks';
import { useRecommendedRestaurants } from '../../services/queries/restaurant';
import RestaurantCard from '../ui/restaurant-card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

function Recommended() {
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  const {
    data: recommendedRestaurants,
    isLoading,
    error,
  } = useRecommendedRestaurants();

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(ROUTES.RESTAURANT_DETAIL.replace(':id', restaurantId.toString()));
  };

  const handleSeeAll = () => {
    navigate(ROUTES.RESTAURANTS);
  };

  const getGridLayout = () => {
    if (isMobile) return 'grid-cols-1';
    return 'grid-cols-3';
  };

  return (
    <div className='bg-gray-50 py-8'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-6 flex items-center justify-between'>
          <h1
            className={
              isMobile ? 'display-xs-extrabold' : 'display-md-extrabold'
            }
          >
            Recommended
          </h1>
          <button onClick={handleSeeAll} className='text-primary-100'>
            See All
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading restaurants</div>}
        {recommendedRestaurants && (
          <div className={`grid gap-4 ${getGridLayout()}`}>
            {recommendedRestaurants
              .slice(0, isMobile ? 5 : 12)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  distance='2.4 km'
                  onClick={() => handleRestaurantClick(restaurant.id)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommended;
