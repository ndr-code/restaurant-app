import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useScreenSize } from '../../hooks/useScreenSize';

const homeMenuData = [
  {
    title: 'All Restaurants',
    href: '#',
    icon: '/icons/all-restaurants-icon.png',
  },
  {
    title: 'Nearby',
    href: '#',
    icon: '/icons/nearby-icon.png',
  },
  {
    title: 'Discount',
    href: '#',
    icon: '/icons/discount-icon.png',
  },
  {
    title: 'Best Seller',
    href: '#',
    icon: '/icons/best-seller-icon.png',
  },
  {
    title: 'Delivery',
    href: '#',
    icon: '/icons/delivery-icon.png',
  },
  {
    title: 'Lunch',
    href: '#',
    icon: '/icons/lunch-icon.png',
  },
];

function HomeMenu() {
  const { isMobile, isTablet } = useScreenSize();

  // Dynamic text sizing based on screen size
  const getTextSize = () => {
    if (isMobile) return 'text-xs font-bold';
    if (isTablet) return 'text-lg font-bold';
    return 'text-base font-bold';
  };

  // Dynamic icon size based on screen size
  const getIconSize = () => {
    if (isMobile) return 'h-12 w-12';
    if (isTablet) return 'h-16 w-16';
    return 'h-16 w-16';
  };

  return (
    <div className='mx-auto mt-4 mb-4 grid w-full max-w-7xl grid-cols-3 gap-0 sm:mt-8 sm:gap-0 lg:grid-cols-6'>
      {homeMenuData.map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Link
            to={item.href}
            className='flex flex-col items-center space-y-2 rounded-lg p-3 transition-colors duration-200 sm:p-6'
          >
            <motion.div
              className='bg-base-white flex h-25 w-full items-center justify-center rounded-2xl p-3 shadow-lg transition-colors duration-200'
              style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 25px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.img
                src={item.icon}
                alt={item.title}
                className={getIconSize()}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </motion.div>
            <motion.span
              className={`${getTextSize()} text-center`}
              whileHover={{ scale: 1.05, color: 'var(--primary)' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {item.title}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default HomeMenu;
