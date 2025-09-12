import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useRestaurantsQuery } from '../services/queries/useRestaurantsQuery';
import { useRestaurantUI } from '../hooks/useRestaurantUI';
import type { Restaurant } from '../types/Restaurant';

const Restaurants: React.FC = () => {
  const { 
    searchQuery, 
    filters, 
    currentPage, 
    itemsPerPage 
  } = useRestaurantUI();

  const { 
    data: restaurants, 
    isLoading, 
    error 
  } = useRestaurantsQuery({
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load the restaurants. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Restaurants
        </h1>
        <p className="text-gray-600">
          Discover amazing restaurants near you
        </p>
      </div>

      {/* Filters & Search - TODO: Implement filter components */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          Search and filter functionality will be implemented here
        </p>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {restaurants?.data?.length || 0} restaurants
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.data?.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
              {restaurant.image ? (
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {restaurant.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {restaurant.rating || 'N/A'}
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">
                  {(restaurant as Restaurant).cuisine?.[0] || 'Various'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                📍 {restaurant.location}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">
                  {restaurant.priceRange}
                </span>
                <Button 
                  size="sm"
                  onClick={() => {
                    // TODO: Navigate to restaurant detail page
                    console.log('Navigate to restaurant:', restaurant.id);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {restaurants?.data?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              // TODO: Navigate to home page
              console.log('Navigate to home');
            }}
          >
            Back to Home
          </Button>
        </div>
      )}

      {/* Pagination - TODO: Implement pagination component */}
      {restaurants?.pagination && restaurants.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              Pagination component will be implemented here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
