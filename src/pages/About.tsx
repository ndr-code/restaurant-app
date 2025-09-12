import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About RestaurantApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connecting food lovers with amazing restaurants since 2024
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                To make discovering and enjoying great food experiences accessible to everyone
              </p>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                At RestaurantApp, we believe that great food brings people together. Our platform 
                connects hungry customers with incredible restaurants, making it easier than ever 
                to discover your next favorite meal.
              </p>
              <p className="mb-4">
                Whether you're looking for a quick bite, planning a special dinner, or exploring 
                new cuisines, we're here to help you find exactly what you're craving.
              </p>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Search
              </h3>
              <p className="text-gray-600">
                Find restaurants by cuisine, location, price range, and more with our intelligent search system.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real Reviews
              </h3>
              <p className="text-gray-600">
                Read authentic reviews from real customers to make informed dining decisions.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Ordering
              </h3>
              <p className="text-gray-600">
                Browse menus, customize your order, and enjoy seamless checkout and delivery tracking.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600">
                Order on the go with our fully responsive design that works perfectly on any device.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Get your favorite meals delivered quickly with real-time tracking and updates.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Pay safely with multiple payment options and encrypted transaction processing.
              </p>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  John Smith
                </h3>
                <p className="text-gray-600 mb-2">CEO & Founder</p>
                <p className="text-sm text-gray-500">
                  Food enthusiast with 10+ years in tech
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Sarah Johnson
                </h3>
                <p className="text-gray-600 mb-2">CTO</p>
                <p className="text-sm text-gray-500">
                  Building scalable platforms for food lovers
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Mike Chen
                </h3>
                <p className="text-gray-600 mb-2">Head of Operations</p>
                <p className="text-sm text-gray-500">
                  Ensuring smooth restaurant partnerships
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  10,000+
                </div>
                <p className="text-gray-600">Happy Customers</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <p className="text-gray-600">Partner Restaurants</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  50,000+
                </div>
                <p className="text-gray-600">Orders Delivered</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  25+
                </div>
                <p className="text-gray-600">Cities Served</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of food lovers who trust RestaurantApp for their dining needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Explore Restaurants
              </Button>
              <Button variant="outline" size="lg">
                Partner with Us
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
