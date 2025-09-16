import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Restaurant } from '../../types/Restaurant';
import { useScreenSize } from '../../hooks';

interface RestaurantCardProps {
  restaurant: Restaurant;
  distance?: string; // Format: "2.4 km"
  onClick?: () => void;
}

function RestaurantCard({
  restaurant,
  distance = '2.4 km',
  onClick,
}: RestaurantCardProps) {
  const { isMobile, isTablet } = useScreenSize();

  // Dynamic sizing based on screen size
  const getImageSize = () => {
    if (isMobile) return 'h-12 w-12';
    if (isTablet) return 'h-14 w-14';
    return 'h-16 w-16';
  };

  const getTextSize = () => {
    if (isMobile)
      return {
        name: 'text-sm font-semibold',
        rating: 'text-xs',
        location: 'text-xs text-gray-600',
      };
    return {
      name: 'text-base font-semibold',
      rating: 'text-sm',
      location: 'text-sm text-gray-600',
    };
  };

  const textSizes = getTextSize();

  return (
    <motion.div
      className={`flex cursor-pointer items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md ${
        isMobile ? 'p-3' : 'p-4'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {/* Restaurant Image/Logo */}
      <div
        className={`flex-shrink-0 overflow-hidden rounded-lg ${getImageSize()}`}
      >
        <img
          src={restaurant.image}
          alt={`${restaurant.name} logo`}
          className='h-full w-full object-cover'
          loading='lazy'
        />
      </div>

      {/* Restaurant Info */}
      <div className='flex-1'>
        {/* Restaurant Name */}
        <h3 className={`mb-1 ${textSizes.name}`}>{restaurant.name}</h3>

        {/* Rating */}
        <div className='mb-1 flex items-center gap-1'>
          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
          <span className={`${textSizes.rating} font-medium`}>
            {restaurant.rating.toFixed(1)}
          </span>
        </div>

        {/* Location and Distance */}
        <div className={`flex items-center gap-2 ${textSizes.location}`}>
          <span>{restaurant.location}</span>
          <span>•</span>
          <span>{distance}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;
