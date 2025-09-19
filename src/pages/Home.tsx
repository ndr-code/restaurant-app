import React, { useState } from 'react';
import Hero from '@/components/home/hero';
import HomeMenu from '@/components/home/home-menu';
import Recommended from '@/components/home/recommended';
import SearchResult from '@/components/home/search-result';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useSearchState } from '@/hooks/useSearch';
import { GeolocationProvider } from '../providers/GeolocationProvider';
const Home: React.FC = () => {
  const [showSearchMode, setShowSearchMode] = useState(false);

  const {
    searchQuery,
    hasSearched,
    handleSearch,
    clearSearch,
    setSearchComplete,
  } = useSearchState();

  const handleToggleSearchMode = () => {
    setShowSearchMode(!showSearchMode);
  };

  const handleSearchFromRecommended = (query: string) => {
    handleSearch(query);
    setShowSearchMode(false); // Switch back to search results after search
  };

  return (
    <GeolocationProvider autoRequest={true}>
      <div className='relative bg-neutral-50'>
        <Navbar />
        <Hero onSearch={handleSearch} onClearSearch={clearSearch} />
        <HomeMenu />
        {hasSearched && searchQuery ? (
          <SearchResult
            searchQuery={searchQuery}
            onClearSearch={clearSearch}
            onSearchComplete={setSearchComplete}
            onSearch={handleSearch}
          />
        ) : showSearchMode ? (
          <SearchResult
            searchQuery=''
            onClearSearch={() => setShowSearchMode(false)}
            onSearchComplete={setSearchComplete}
            onSearch={handleSearchFromRecommended}
          />
        ) : (
          <Recommended onToggleSearchMode={handleToggleSearchMode} />
        )}
        <Footer />
      </div>
    </GeolocationProvider>
  );
};
export default Home;
