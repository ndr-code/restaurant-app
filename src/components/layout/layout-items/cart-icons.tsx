import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MenuIcons } from './menu-icons';
import { ROUTES } from '../../../config/routes';

interface NavIconProps {
  icon: () => React.ReactElement;
  onClick: () => void;
  label: string;
}

const NavIcon = ({ icon: Icon, onClick, label }: NavIconProps) => (
  <motion.div
    className='group relative flex cursor-pointer items-center justify-center'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400 }}
    onClick={onClick}
    title={label}
  >
    <Icon />
    {/* Tooltip */}
    <div className='pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
      {label}
    </div>
  </motion.div>
);

export const CartIcons = () => {
  const navigate = useNavigate();

  const navigationItems = [
    { icon: MenuIcons.Cart, route: ROUTES.CART, label: 'Cart' },
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
