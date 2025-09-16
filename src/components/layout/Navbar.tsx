import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../config/routes';
import { buttonVariants } from '../ui/button-variants';
import {
  getSignInButtonStyles,
  getSignInButtonHoverStyles,
  getSignUpButtonStyles,
  getSignUpButtonHoverStyles,
  buttonAnimations,
} from './layout-items/navbar-button-utils';

import MobileMenu from './layout-items/mobile-menu';
import DesktopMenu from './layout-items/desktop-menu';
import { CartIcons } from './layout-items/cart-icons';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const { isAuthenticated } = useAuth();
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
      className='fixed top-0 right-0 left-0 z-50'
      style={{
        backgroundColor: isScrolled
          ? 'rgba(255, 255, 255, 0.7)'
          : 'transparent',
        backdropFilter: isScrolled
          ? 'blur(12px) saturate(180%)'
          : 'saturate(100%)',
        WebkitBackdropFilter: isScrolled
          ? 'blur(12px) saturate(180%)'
          : 'saturate(100%)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : 'none',
        boxShadow: isScrolled ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : 'none',
      }}
      animate={{
        backgroundColor: isScrolled
          ? 'rgba(255, 255, 255, 0.7)'
          : 'transparent',
        backdropFilter: isScrolled
          ? 'blur(12px) saturate(180%)'
          : 'saturate(100%)',
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
            className='flex items-center gap-4 font-bold'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.img
              src='/icons/logo-foody.svg'
              alt='Foody Logo'
              className='h-8 w-8'
              style={{
                filter: isScrolled
                  ? 'brightness(0) saturate(100%) invert(18%) sepia(97%) saturate(4456%) hue-rotate(354deg) brightness(95%) contrast(94%)'
                  : 'none',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            />
            Foody
          </motion.div>
        </Link>
        <div className='flex flex-row items-center gap-3'>
          {isAuthenticated ? (
            // Authenticated state - Desktop dropdown menu
            <>
              <CartIcons isScrolled={isScrolled} />
              <DesktopMenu isScrolled={isScrolled} />
            </>
          ) : (
            // Logged out state - Sign In and Sign Up buttons (Desktop only)
            <div className='hidden items-center gap-3 md:flex'>
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

          {/* Mobile Menu */}
          <MobileMenu isScrolled={isScrolled} />
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
