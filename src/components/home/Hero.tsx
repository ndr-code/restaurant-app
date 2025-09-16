import { motion } from 'motion/react';
import { useScreenSize } from '@/hooks';
import Searchbar from './searchbar';

function Hero() {
  const { isAtLeast } = useScreenSize();

  const getTitleSize = () => {
    if (isAtLeast('sm')) return 'display-2xl-extrabold';
    return 'display-lg-extrabold';
  };

  const getSubtitleSize = () => {
    if (isAtLeast('sm')) return 'display-xs-bold';
    return 'text-lg-bold';
  };

  return (
    <div
      className='relative flex h-screen flex-col items-center justify-center space-y-4 bg-cover bg-center bg-no-repeat p-4 pt-20 shadow-lg'
      style={{ backgroundImage: "url('/images/hero-background.png')" }}
    >
      <div className='absolute inset-0 h-full bg-black/60'></div>

      <div className='relative z-10 text-center'>
        <motion.h1
          className={`${getTitleSize()} mb-6 text-neutral-50`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: 'easeOut',
          }}
        >
          Explore Culinary Experiences
        </motion.h1>

        <motion.p
          className={`${getSubtitleSize()} mb-8 text-neutral-50`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: 'easeOut',
          }}
        >
          Search and refine your choice to discover the perfect restaurant.
        </motion.p>

        <Searchbar />
      </div>
    </div>
  );
}

export default Hero;
