import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../config/routes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { MenuIcons } from './menu-icons';
import { AvatarWithInitials } from '../../ui/avatar';

interface DesktopMenuProps {
  isScrolled?: boolean;
}

function DesktopMenu({ isScrolled = false }: DesktopMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Only show for authenticated users
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='hidden md:block'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            className='flex items-center gap-3 space-x-2 rounded-md px-3 py-2 focus:ring-0 focus:outline-none'
            style={{
              color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* Avatar and Username */}
            <motion.div
              className='flex cursor-pointer items-center justify-center'
              whileHover={{
                scale: 1.1,
              }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <AvatarWithInitials
                src={user?.avatar}
                alt={user?.name || 'Avatar'}
                name={user?.name}
                size='lg'
                className='shadow-lg'
              />
            </motion.div>

            <motion.div
              className='text-lg-semibold cursor-pointer'
              whileHover={{
                scale: 1.1,
              }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {user?.name || 'User'}
            </motion.div>
          </motion.button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-64' align='end' sideOffset={5}>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex items-center space-x-3'>
              <MenuIcons.Profile user={user || undefined} />
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {user?.name || 'User'}
                </p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => navigate(ROUTES.HOME)}
              className='cursor-pointer'
            >
              <MenuIcons.Home />
              Home
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(ROUTES.RESTAURANTS)}
              className='cursor-pointer'
            >
              <MenuIcons.Restaurant />
              Restaurants
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(ROUTES.CART)}
              className='cursor-pointer'
            >
              <MenuIcons.Cart />
              Cart
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(ROUTES.ORDERS)}
              className='cursor-pointer'
            >
              <MenuIcons.Orders />
              Orders
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className='text-destructive focus:text-destructive cursor-pointer'
          >
            <MenuIcons.Logout />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DesktopMenu;
