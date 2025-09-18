import React from 'react';
import Hero from '@/components/home/hero';
import HomeMenu from '@/components/home/home-menu';
import Recommended from '@/components/home/recommended';
import SearchResult from '@/components/home/search-result';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useSearchState } from '@/hooks/useSearch';
const Home: React.FC = () => {
  const { searchQuery, hasSearched, isSearching, handleSearch, clearSearch, setSearchComplete } = useSearchState();

  return (
    <div className='relative bg-neutral-50'>
      <Navbar />
      <Hero onSearch={handleSearch} onClearSearch={clearSearch} />
      <HomeMenu />
      {hasSearched && searchQuery ? (
        <SearchResult
          searchQuery={searchQuery}
          onClearSearch={clearSearch}
          onSearchComplete={setSearchComplete}
        />
      ) : (
        <Recommended />
      )}
      <Footer />
    </div>
  );
};
export default Home;
