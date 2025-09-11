import React, { useState } from 'react';
import { useAppDispatch } from '../store';
import { useRestaurants } from '../store/hooks';
import { fetchRestaurants } from '../store/slices/restaurantSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const AllRestaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants, isLoading, error } = useRestaurants();
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadRestaurants = async () => {
    setHasLoaded(true);
    try {
      await dispatch(fetchRestaurants({
        page: 1,
        limit: 10
      }));
    } catch (err) {
      console.error('Error loading restaurants:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-display-3xl font-bold text-gray-900 mb-4">
            Restaurant Discovery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan restoran terbaik di sekitar Anda
          </p>
          
          {!hasLoaded && (
            <Button 
              onClick={handleLoadRestaurants}
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Memuat...' : 'Tampilkan Semua Restoran'}
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading && hasLoaded && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Memuat restoran...</p>
          </div>
        )}

        {hasLoaded && restaurants.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-display-xl font-semibold text-gray-900">
                Daftar Restoran ({restaurants.length})
              </h2>
              <Button 
                onClick={handleLoadRestaurants}
                variant="outline"
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Refresh'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {restaurant.name}
                    </CardTitle>
                    <CardDescription>
                      {restaurant.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Rating:</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 font-medium">
                            {restaurant.rating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Price Range:</span>
                        <span className="text-sm font-medium">{restaurant.priceRange}</span>
                      </div>
                      
                      {restaurant.isOpen !== undefined && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`text-sm font-medium ${restaurant.isOpen ? 'text-success-600' : 'text-error-600'}`}>
                            {restaurant.isOpen ? 'Buka' : 'Tutup'}
                          </span>
                        </div>
                      )}
                      
                      <div className="pt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => console.log('View details for:', restaurant.name)}
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {hasLoaded && restaurants.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada restoran ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba refresh atau periksa koneksi internet Anda
            </p>
            <Button onClick={handleLoadRestaurants} variant="outline">
              Coba Lagi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
