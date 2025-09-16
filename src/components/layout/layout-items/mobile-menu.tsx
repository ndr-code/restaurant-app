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

interface MobileMenuProps {
  isScrolled?: boolean;
}

function MobileMenu({ isScrolled = false }: MobileMenuProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleSignUp = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleLogout = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            className='flex items-center justify-center rounded-md focus:ring-0 focus:outline-none'
            style={{
              color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {isAuthenticated ? (
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <AvatarWithInitials
                  src={user?.avatar}
                  alt={user?.name || 'Avatar'}
                  name={user?.name}
                  size='md'
                />
              </motion.div>
            ) : (
              <svg
                className='h-10 w-10'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </motion.button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mr-4 w-56' align='end' sideOffset={5}>
          {isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={handleSignIn}
                  className='cursor-pointer'
                >
                  <MenuIcons.SignIn />
                  Sign In
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleSignUp}
                  className='cursor-pointer'
                >
                  <MenuIcons.SignUp />
                  Sign Up
                </DropdownMenuItem>
              </DropdownMenuGroup>

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
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MobileMenu;
