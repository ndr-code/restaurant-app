import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { useRestaurants } from '../services/queries/restaurant';
import { 
  setSearchQuery, 
  setFilters, 
  setSortBy,
  toggleFilterModal,
  selectRestaurantUI 
} from '@/features/restaurant/restaurantUISlice';

const StateDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux untuk UI State
  const uiState = useAppSelector(selectRestaurantUI);
  
  // React Query untuk Server State
  const { 
    data: restaurantData, 
    isLoading, 
    error,
    refetch 
  } = useRestaurants(uiState.filters);

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterChange = (priceMin: number) => {
    dispatch(setFilters({ priceMin }));
  };

  const handleSortChange = (sortBy: 'name' | 'rating' | 'priceRange' | 'distance') => {
    dispatch(setSortBy(sortBy));
  };

  const toggleModal = () => {
    dispatch(toggleFilterModal());
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">🏗️ State Management Demo</h2>
      
      {/* UI State (Redux) */}
      <div className="mb-8 p-4 bg-blue-50 rounded">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">
          📱 UI State (Redux Toolkit)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search Query:</label>
            <input
              type="text"
              value={uiState.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Cari restoran..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Price Filter (Min):</label>
            <input
              type="number"
              value={uiState.filters.priceMin || ''}
              onChange={(e) => handleFilterChange(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Harga minimum"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sort By:</label>
            <select
              value={uiState.sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'name' | 'rating' | 'priceRange' | 'distance')}
              className="w-full p-2 border rounded"
            >
              <option value="name">Nama</option>
              <option value="rating">Rating</option>
              <option value="priceRange">Harga</option>
              <option value="distance">Jarak</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {uiState.isFilterModalOpen ? 'Close Modal' : 'Open Modal'}
            </button>
            
            <span className="text-sm">
              Modal: {uiState.isFilterModalOpen ? '✅ Open' : '❌ Closed'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-sm">
          <strong>Current UI State:</strong>
          <pre className="mt-2 text-xs">
            {JSON.stringify(uiState, null, 2)}
          </pre>
        </div>
      </div>

      {/* Server State (React Query) */}
      <div className="p-4 bg-green-50 rounded">
        <h3 className="text-lg font-semibold mb-4 text-green-800">
          🌐 Server State (React Query)
        </h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Refetch Data'}
          </button>
          
          <span className="text-sm">
            Status: {isLoading ? '⏳ Loading' : error ? '❌ Error' : '✅ Success'}
          </span>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Error: {error.message}
          </div>
        )}
        
        {restaurantData && (
          <div className="p-3 bg-green-100 rounded text-sm">
            <strong>Server Data:</strong>
            <div className="mt-2">
              <p>Total Restaurants: {restaurantData.restaurants.length}</p>
              <p>Current Page: {restaurantData.pagination.page}</p>
              <p>Total Pages: {restaurantData.pagination.totalPages}</p>
              <p>Cache Time: {new Date().toLocaleTimeString()}</p>
            </div>
            
            <details className="mt-2">
              <summary className="cursor-pointer font-medium">View Restaurant Data</summary>
              <pre className="mt-2 text-xs max-h-48 overflow-y-auto">
                {JSON.stringify(restaurantData.restaurants.slice(0, 3), null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Architecture Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Redux:</strong> UI state (search, filters, modals, preferences)</li>
          <li>• <strong>React Query:</strong> Server state (API data, caching, background updates)</li>
          <li>• <strong>Separation:</strong> Clear responsibilities, better performance</li>
          <li>• <strong>Benefits:</strong> Automatic caching, optimistic updates, error handling</li>
        </ul>
      </div>
    </div>
  );
};

export default StateDemo;
