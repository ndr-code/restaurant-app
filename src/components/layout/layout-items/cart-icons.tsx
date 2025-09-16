import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

interface NavIconProps {
  icon: React.ReactElement;
  onClick: () => void;
  label: string;
}

const NavIcon = ({ icon, onClick, label }: NavIconProps) => (
  <motion.div
    className='group relative flex cursor-pointer items-center justify-center'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400 }}
    onClick={onClick}
    title={label}
  >
    {icon}
    {/* Tooltip */}
    <div className='pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
      {label}
    </div>
  </motion.div>
);

export const CartIcons = ({ isScrolled }: { isScrolled?: boolean }) => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      icon: (
        <img
          src='/icons/cart.svg'
          alt='Cart'
          className='h-5 w-5 drop-shadow-sm sm:h-6 sm:w-6'
          style={{
            filter: isScrolled
              ? 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
              : 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
          }}
        />
      ),
      route: ROUTES.CART,
      label: 'Cart',
    },
  ];

  return (
    <div className='flex items-center gap-3'>
      {navigationItems.map((item, index) => (
        <NavIcon
          key={index}
          icon={item.icon}
          onClick={() => navigate(item.route)}
          label={item.label}
        />
      ))}
    </div>
  );
};
