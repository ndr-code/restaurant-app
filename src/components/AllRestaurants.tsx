import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { useRestaurants } from '../services/queries/restaurant';
import { 
  setFilters, 
  setCurrentPage, 
  selectFilters, 
  selectPagination 
} from '../features/restaurant/restaurantUISlice';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Types untuk API response yang sebenarnya
interface RestaurantFromAPI {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
}

const AllRestaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const pagination = useAppSelector(selectPagination);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // React Query untuk server state
  const { 
    data: restaurantData, 
    isLoading, 
    error,
    refetch 
  } = useRestaurants(filters, { enabled: hasLoaded });

  const restaurants = restaurantData?.restaurants || [];
  const paginationMeta = restaurantData?.pagination;

  const handleLoadRestaurants = () => {
    setHasLoaded(true);
    if (!hasLoaded) {
      refetch();
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setFilters({ page }));
  };

  const handleRefresh = () => {
    refetch();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍽️ Restaurant Discovery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan restoran terbaik di sekitar Anda dengan React Query + Redux
          </p>
          
          {!hasLoaded && (
            <Button 
              onClick={handleLoadRestaurants}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Memuat...' : '🔍 Tampilkan Semua Restoran'}
            </Button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <div>
                <p className="font-medium">Error:</p>
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && hasLoaded && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat restoran...</p>
          </div>
        )}

        {/* Restaurants Grid */}
        {hasLoaded && restaurants.length > 0 && (
          <div className="space-y-6">
            {/* Header dengan Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                📍 Daftar Restoran ({restaurants.length})
              </h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button 
                  onClick={handleRefresh}
                  variant="outline"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? '⏳' : '🔄'} 
                  {isLoading ? 'Memuat...' : 'Refresh'}
                </Button>
                
                {/* Pagination Info */}
                {paginationMeta && paginationMeta.totalPages > 1 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">
                      Page {paginationMeta.page} of {paginationMeta.totalPages}
                    </span>
                    <div className="flex gap-1">
                      {paginationMeta.page > 1 && (
                        <Button
                          onClick={() => handlePageChange(paginationMeta.page - 1)}
                          variant="outline"
                          size="sm"
                        >
                          ← Prev
                        </Button>
                      )}
                      {paginationMeta.page < paginationMeta.totalPages && (
                        <Button
                          onClick={() => handlePageChange(paginationMeta.page + 1)}
                          variant="outline"
                          size="sm"
                        >
                          Next →
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Restaurant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => {
                const restaurantData = restaurant as unknown as RestaurantFromAPI;
                return (
                <Card 
                  key={restaurantData.id} 
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  {/* Restaurant Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={restaurantData.images?.[0] || '/placeholder-restaurant.jpg'}
                      alt={restaurantData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Restaurant';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium">
                      ⭐ {restaurantData.star?.toFixed(1)}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {restaurantData.name}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-600">
                      📍 {restaurantData.place}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span>📝</span>
                        <span>{restaurantData.reviewCount} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🍽️</span>
                        <span>{restaurantData.menuCount} menu</span>
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    {restaurantData.priceRange && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-600 mb-1">💰 Price Range:</div>
                        <div className="text-sm font-medium text-green-600">
                          {formatPrice(restaurantData.priceRange.min)} - {formatPrice(restaurantData.priceRange.max)}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => console.log('View details for:', restaurantData.name)}
                    >
                      👀 Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {hasLoaded && restaurants.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <div className="text-6xl mb-4">🍽️</div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Tidak ada restoran ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba refresh atau periksa koneksi internet Anda
            </p>
            <Button onClick={handleLoadRestaurants} variant="outline">
              🔄 Coba Lagi
            </Button>
          </div>
        )}

        {/* State Management Debug Info */}
        {hasLoaded && (
          <div className="mt-12 p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              🔧 State Management Architecture
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* React Query Info */}
              <div className="space-y-2">
                <h5 className="font-medium text-green-700 flex items-center gap-2">
                  🌐 React Query (Server State)
                </h5>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span className="font-mono">{restaurants.length} restaurants</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loading:</span>
                    <span className={`font-mono ${isLoading ? 'text-yellow-600' : 'text-green-600'}`}>
                      {isLoading ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error:</span>
                    <span className={`font-mono ${error ? 'text-red-600' : 'text-green-600'}`}>
                      {error ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache:</span>
                    <span className="font-mono text-blue-600">Auto-managed</span>
                  </div>
                </div>
              </div>

              {/* Redux Info */}
              <div className="space-y-2">
                <h5 className="font-medium text-blue-700 flex items-center gap-2">
                  📱 Redux (UI State)
                </h5>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Current Page:</span>
                    <span className="font-mono">{pagination.currentPage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Per Page:</span>
                    <span className="font-mono">{pagination.itemsPerPage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Has Filters:</span>
                    <span className="font-mono">
                      {Object.values(filters).some(v => v && v !== '') ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Sync:</span>
                    <span className="font-mono text-green-600">Perfect</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
              <strong className="text-blue-800">💡 Architecture Benefits:</strong>
              <div className="mt-1 text-blue-700">
                Server state (API data) managed by React Query with automatic caching, 
                background updates & error handling. UI state (filters, pagination) managed by Redux 
                for predictable updates & persistence.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
