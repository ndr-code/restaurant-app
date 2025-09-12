import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Restaurant: React.FC = () => {
  // This would normally get restaurant ID from route params
  // const restaurantId = 1; // Placeholder - will be used when implementing routing

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-display-2xl font-bold text-gray-900 mb-2">
                Restaurant Name
              </h1>
              <p className="text-gray-600 mb-4">
                Authentic Indonesian cuisine in the heart of the city
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">4.5</span>
                </div>
                <span>•</span>
                <span>$$ - $$$</span>
                <span>•</span>
                <span>Jl. Sudirman No. 123</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Buka
              </span>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-display-xl font-semibold text-gray-900">
              Menu
            </h2>
            <Button variant="outline">
              Filter Menu
            </Button>
          </div>

          {/* Menu Categories */}
          <div className="space-y-8">
            {/* Main Dishes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Makanan Utama
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">Nasi Goreng Spesial</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Nasi goreng dengan ayam, udang, dan telur
                          </p>
                          <p className="font-bold text-lg mt-2">
                            Rp 35.000
                          </p>
                        </div>
                        <Button size="sm" className="ml-4">
                          Tambah
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Beverages */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Minuman
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <Card key={item} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">Es Teh Manis</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Teh manis dengan es batu
                          </p>
                          <p className="font-bold text-lg mt-2">
                            Rp 8.000
                          </p>
                        </div>
                        <Button size="sm" className="ml-4">
                          Tambah
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-display-xl font-semibold text-gray-900">
            Ulasan Pelanggan
          </h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <Card key={review}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">John Doe</CardTitle>
                      <CardDescription>2 hari yang lalu</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★★</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Makanan sangat enak dan pelayanan ramah. Nasi gorengnya juara!
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
