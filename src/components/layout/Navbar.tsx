import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { buttonVariants } from '../ui/button-variants';
import {
  getSignInButtonStyles,
  getSignInButtonHoverStyles,
  getSignUpButtonStyles,
  getSignUpButtonHoverStyles,
  buttonAnimations,
} from '../ui/navbar-button-utils';
import type { RootState } from '../../store';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleSignUp = () => {
    navigate(ROUTES.REGISTER);
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className='backdrop-blur-2xs fixed top-0 right-0 left-0 z-50'
      style={{
        backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        boxShadow: isScrolled ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : 'none',
      }}
      animate={{
        backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className='display-md-extrabold mx-auto flex max-w-7xl flex-row justify-between p-4'
        style={{
          color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
        }}
        animate={{
          color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <Link
          to={ROUTES.HOME}
          className='flex items-center gap-2 font-bold no-underline'
        >
          <motion.div
            className='flex items-center gap-2 font-bold'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.img
              src='/icons/logo-foody.svg'
              alt='Foody Logo'
              className='h-8 w-8'
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(18%) sepia(97%) saturate(4456%) hue-rotate(354deg) brightness(95%) contrast(94%)',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            />
            Foody
          </motion.div>
        </Link>
        <div className='flex flex-row items-center gap-4'>
          {/* Conditional rendering based on Redux auth state */}
          {isAuthenticated ? (
            // Logged in state - Avatar and Username
            <>
              {/* Cart Icon */}
              <motion.div
                className='flex cursor-pointer items-center justify-center'
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.img
                  src='/icons/cart.svg'
                  alt='Cart'
                  className='h-6 w-6'
                  animate={{
                    filter: isScrolled ? 'invert(1)' : 'invert(0)',
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
              <motion.div
                className='flex cursor-pointer items-center justify-center'
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.img
                  src='/icons/ava.png'
                  alt='Avatar'
                  className='h-12 w-12 rounded-full object-cover shadow-lg'
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
              </motion.div>

              <motion.div
                className='text-lg-semibold cursor-pointer'
                whileHover={{
                  scale: 1.1,
                  color: 'var(--primary)',
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {user?.name || 'User'}
              </motion.div>
            </>
          ) : (
            // Logged out state - Sign In and Sign Up buttons
            <div className='flex items-center gap-3'>
              <motion.button
                onClick={handleSignIn}
                className={buttonVariants({ variant: 'navbar-signin' })}
                style={getSignInButtonStyles(isScrolled)}
                whileHover={getSignInButtonHoverStyles()}
                whileTap={buttonAnimations.whileTap}
                transition={buttonAnimations.transition}
              >
                Sign In
              </motion.button>

              <motion.button
                onClick={handleSignUp}
                className={buttonVariants({ variant: 'navbar-signup' })}
                style={getSignUpButtonStyles(isScrolled)}
                whileHover={getSignUpButtonHoverStyles()}
                whileTap={buttonAnimations.whileTap}
                transition={buttonAnimations.transition}
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
