import { useState } from 'react';
import { motion } from 'motion/react';

function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // TODO: Implement search functionality
    }
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className='relative mx-auto w-full max-w-2xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className='relative'>
        {/* Search Icon */}
        <motion.div
          className='absolute top-1/2 left-4 z-10 -translate-y-1/2 transform'
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
          }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </motion.div>

        {/* Input Field */}
        <motion.input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='Search restaurants, food, and drink...'
          className='bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-full border py-4 pr-16 pl-12 backdrop-blur-md transition-all duration-300 focus:ring-2 focus:outline-none'
          animate={{
            backgroundColor: isFocused
              ? 'var(--background)'
              : 'var(--background)/80',
            borderColor: isFocused ? 'var(--primary)' : 'var(--border)',
            boxShadow: isFocused
              ? '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--primary)'
              : '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Search Button */}
        <motion.button
          type='submit'
          className='bg-primary hover:bg-primary/90 text-primary-foreground absolute top-1/2 right-2 flex -translate-y-1/2 transform items-center gap-2 rounded-full px-2 py-2 font-semibold transition-colors duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!searchValue.trim()}
        >
          <svg
            className='h-7 w-7'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 7l5 5m0 0l-5 5m5-5H6'
            />
          </svg>
        </motion.button>

        {/* Clear Button */}
        {searchValue && (
          <motion.button
            type='button'
            onClick={() => setSearchValue('')}
            className='text-muted-foreground hover:text-foreground absolute top-1/2 right-16 -translate-y-1/2 transform p-1 transition-colors'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Search Suggestions (Optional) */}
      {isFocused && searchValue && (
        <motion.div
          className='bg-background border-border absolute top-full z-20 mt-2 w-full overflow-hidden rounded-full border shadow-lg'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='p-4'>
            <p className='text-muted-foreground text-sm'>
              Search suggestions will appear here...
            </p>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
}

export default Searchbar;
