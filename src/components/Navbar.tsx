import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

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
          color: isScrolled ? 'var(--foreground)' : 'var(--background)',
        }}
        animate={{
          color: isScrolled ? 'var(--foreground)' : 'var(--background)',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className='font-bold'
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Foody
        </motion.div>
        <div className='flex flex-row items-center gap-4'>
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
                filter: isScrolled ? 'invert(0)' : 'invert(1)',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          <motion.div
            className='cursor-pointer'
            whileHover={{
              scale: 1.1,
              color: 'var(--primary)',
            }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Avatar
          </motion.div>
          <motion.div
            className='text-lg-semibold cursor-pointer'
            whileHover={{
              scale: 1.1,
              color: 'var(--primary)',
            }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            John Doe
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
