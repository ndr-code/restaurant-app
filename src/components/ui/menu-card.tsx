import { Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useScreenSize } from '../../hooks';

interface MenuCardProps {
  menu: {
    id: number;
    name: string;
    description?: string;
    price: number;
    image: string;
    category: string;
    restaurant?: {
      id: number;
      name: string;
      place: string;
    };
  };
  onClick?: () => void;
}

function MenuCard({ menu, onClick }: MenuCardProps) {
  const { isMobile, isTablet } = useScreenSize();

  // Dynamic sizing based on screen size
  const getImageSize = () => {
    if (isMobile) return 'h-20 w-20';
    if (isTablet) return 'h-25 w-25';
    return 'h-30 w-30';
  };

  const getTextSize = () => {
    if (isMobile)
      return {
        name: 'text-sm font-bold',
        price: 'text-xs font-medium text-green-600',
        description: 'text-xs text-gray-600',
        restaurant: 'text-xs text-gray-500',
      };
    return {
      name: 'text-base font-bold',
      price: 'text-sm font-medium text-green-600',
      description: 'text-sm text-gray-600',
      restaurant: 'text-sm text-gray-500',
    };
  };

  const textSizes = getTextSize();

  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className={`flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md sm:rounded-2xl ${
        isMobile ? 'p-3' : 'p-4'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {/* Menu Image */}
      <div
        className={`flex-shrink-0 overflow-hidden rounded-md sm:rounded-xl ${getImageSize()}`}
      >
        <img
          src={menu.image || '/icons/bk-logo.png'}
          alt={`${menu.name || 'Menu'} image`}
          className='h-full w-full object-cover'
          loading='lazy'
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/icons/bk-logo.png';
          }}
        />
      </div>

      {/* Menu Info */}
      <div className='flex-1'>
        {/* Menu Name */}
        <h3 className={`mb-1 ${textSizes.name}`}>
          {menu.name || 'Unknown Menu'}
        </h3>

        {/* Price */}
        <div className={`mb-1 ${textSizes.price}`}>
          {formatPrice(menu.price)}
        </div>

        {/* Description */}
        {menu.description && (
          <p className={`mb-1 ${textSizes.description} line-clamp-2`}>
            {menu.description}
          </p>
        )}

        {/* Restaurant Info */}
        <div className={`flex items-center gap-2 ${textSizes.restaurant}`}>
          <MapPin className='h-3 w-3' />
          <span>{menu.restaurant?.name || 'Unknown Restaurant'}</span>
          <span>•</span>
          <span>{menu.restaurant?.place || 'Unknown location'}</span>
        </div>
      </div>

      {/* Category Badge */}
      <div className='flex-shrink-0'>
        <span className='bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium'>
          {menu.category || 'Food'}
        </span>
      </div>
    </motion.div>
  );
}

export default MenuCard;
