import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useRestaurantsQuery } from '../services/queries/useRestaurantsQuery';
import { useRestaurantUI } from '../hooks/useRestaurantUI';
import type { Restaurant } from '../types/Restaurant';

const Restaurants: React.FC = () => {
  const { searchQuery, filters, currentPage, itemsPerPage } = useRestaurantUI();

  const {
    data: restaurants,
    isLoading,
    error,
  } = useRestaurantsQuery({
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className='animate-pulse'>
              <div className='h-48 rounded-t-lg bg-gray-300'></div>
              <div className='space-y-3 p-4'>
                <div className='h-4 w-3/4 rounded bg-gray-300'></div>
                <div className='h-3 w-1/2 rounded bg-gray-300'></div>
                <div className='h-3 w-full rounded bg-gray-300'></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold text-gray-900'>
            Oops! Something went wrong
          </h2>
          <p className='mb-6 text-gray-600'>
            We couldn't load the restaurants. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>Restaurants</h1>
        <p className='text-gray-600'>Discover amazing restaurants near you</p>
      </div>

      {/* Filters & Search - TODO: Implement filter components */}
      <div className='mb-8 rounded-lg bg-gray-50 p-4'>
        <p className='text-sm text-gray-500'>
          Search and filter functionality will be implemented here
        </p>
      </div>

      {/* Results Summary */}
      <div className='mb-6'>
        <p className='text-sm text-gray-600'>
          Showing {restaurants?.data?.length || 0} restaurants
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Restaurant Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {restaurants?.data?.map((restaurant) => (
          <Card
            key={restaurant.id}
            className='transition-shadow hover:shadow-lg'
          >
            <div className='aspect-video overflow-hidden rounded-t-lg bg-gray-200'>
              {restaurant.images?.[0] || restaurant.logo ? (
                <img
                  src={restaurant.images?.[0] || restaurant.logo}
                  alt={restaurant.name}
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-gray-400'>
                  No Image
                </div>
              )}
            </div>

            <div className='p-4'>
              <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                {restaurant.name}
              </h3>

              <div className='mb-2 flex items-center gap-2'>
                <div className='flex items-center'>
                  <span className='text-yellow-400'>★</span>
                  <span className='ml-1 text-sm text-gray-600'>
                    {restaurant.star || 'N/A'}
                  </span>
                </div>
                <span className='text-gray-300'>•</span>
                <span className='text-sm text-gray-600'>
                  {(restaurant as Restaurant).cuisine?.[0] || 'Various'}
                </span>
              </div>

              <p className='mb-2 text-sm text-gray-600'>
                📍 {restaurant.place}
              </p>

              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-green-600'>
                  {restaurant.priceRange ? `Rp ${restaurant.priceRange.min.toLocaleString()} - Rp ${restaurant.priceRange.max.toLocaleString()}` : 'Price not available'}
                </span>
                <Button
                  size='sm'
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
        <div className='py-12 text-center'>
          <h3 className='mb-2 text-xl font-medium text-gray-900'>
            No restaurants found
          </h3>
          <p className='mb-6 text-gray-600'>
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant='outline'
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
        <div className='mt-8 flex justify-center'>
          <div className='rounded-lg bg-gray-50 p-4'>
            <p className='text-sm text-gray-500'>
              Pagination component will be implemented here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
