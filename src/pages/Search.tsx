import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import type { Restaurant } from '../types/Restaurant';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // TODO: Implement actual search API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSearchResults([]); // Mock empty results for now
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Restaurants
        </h1>
        <p className="text-gray-600">
          Find your favorite restaurants, cuisines, and dishes
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search for restaurants, cuisines, or dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {!hasSearched && (
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Italian', 'Chinese', 'Pizza', 'Sushi', 'Burger', 
              'Thai', 'Mexican', 'Indian', 'Fast Food', 'Fine Dining'
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery(suggestion);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for "{query}"...</p>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !isSearching && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Search Results for "{query}"
            </h2>
            <p className="text-gray-600">
              Found {searchResults.length} results
            </p>
          </div>

          {searchResults.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-4">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any restaurants matching "{query}". 
                  Try searching with different keywords.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Try different keywords</p>
                  <p>• Check your spelling</p>
                  <p>• Use more general terms</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {result.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {(result as Restaurant).cuisine?.[0] || 'Restaurant'}
                      </span>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      {!hasSearched && (
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Search Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">By Cuisine Type</h4>
                <p>Search for "Italian", "Chinese", "Mexican", etc.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">By Dish</h4>
                <p>Try "Pizza", "Sushi", "Burger", "Pasta", etc.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">By Restaurant Name</h4>
                <p>Search for specific restaurant names</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">By Location</h4>
                <p>Include area names for location-specific results</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Search;
