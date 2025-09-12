import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { useRestaurants } from '../services/queries/restaurant';
import { 
  setFilters, 
  setCurrentPage, 
  selectFilters, 
} from '@/store/slices/restaurantSlice';
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

//Component untuk menangani image dengan fallback
const RestaurantImageWithFallback: React.FC<{
  images: string[];
  name: string;
  className?: string;
  restaurantId?: number;
}> = ({ images, name, className = "", restaurantId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback images yang akan dicoba secara berurutan
  const fallbackImages = [
    // Restaurant interiors - modern & cozy
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center',
    
    // Outdoor dining & cafe vibes
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop&crop=center',
    
    // Food presentation & kitchen
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=300&fit=crop&crop=center',
    
    // Bar & fine dining
    'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    
    // Coffee & casual dining
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1521302080393-2c9e1d3a4302?w=400&h=300&fit=crop&crop=center',
  ];

  // Shuffle fallback images berdasarkan restaurantId untuk variasi yang konsisten
  const getShuffledFallbacks = (id: number) => {
    const shuffled = [...fallbackImages];
    let currentIndex = shuffled.length;
    let randomIndex;
    
    // Use restaurantId as seed for consistent randomization
    const seed = id || Math.floor(Math.random() * 1000);
    
    while (currentIndex !== 0) {
      randomIndex = Math.floor(((seed * currentIndex) % 1000) / 1000 * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
  };

  const shuffledFallbacks = getShuffledFallbacks(restaurantId || 0);
  const allImages = [...(images || []), ...shuffledFallbacks];
  const currentImage = allImages[currentImageIndex];

  const handleImageError = () => {
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setIsLoading(true); // Reset loading state untuk image berikutnya
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setHasError(false);
    setIsLoading(false);
  };

  if (hasError || !currentImage) {
    // Final fallback jika semua image gagal load
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center ${className}`}>
        <div className="text-4xl mb-2">🍽️</div>
        <div className="text-sm text-gray-500 text-center px-2 font-medium">
          {name}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
            <div className="text-xs text-gray-500 mt-2">Loading...</div>
          </div>
        </div>
      )}
      <img
        src={currentImage}
        alt={name}
        className="w-full h-full object-cover"
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </div>
  );
};

const AllRestaurants: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  
  // React Query untuk server state - langsung aktif
  const { 
    data: restaurantData, 
    isLoading, 
    error,
    refetch 
  } = useRestaurants(filters);

  const restaurants = restaurantData?.restaurants || [];
  const paginationMeta = restaurantData?.pagination;

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
            Restaurant Discovery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan restoran terbaik di sekitar Anda dengan React Query + Redux
          </p>
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
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat restoran...</p>
          </div>
        )}

        {/* Restaurants Grid */}
        {restaurants.length > 0 && (
          <div className="space-y-6">
            {/* Header dengan Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Daftar Restoran ({restaurants.length})
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
                    <RestaurantImageWithFallback 
                      images={restaurantData.images || []}
                      name={restaurantData.name}
                      restaurantId={restaurantData.id}
                      className="w-full h-full object-cover"
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
        {restaurants.length === 0 && !isLoading && !error && (
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
            <Button onClick={handleRefresh} variant="outline">
              🔄 Coba Lagi
            </Button>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default AllRestaurants;
