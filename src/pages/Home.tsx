import React from 'react';
import AllRestaurants from '../components/AllRestaurants';
import StateDemo from '../components/StateDemo';
import Debug from '../components/Debug';

const Home: React.FC = () => {
  return (
    <div>
      {/* Main Restaurant Component */}
      <AllRestaurants />
      
      {/* State Management Architecture Demo */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <StateDemo />
      </div>
      
      {/* Debug Panel */}
      <Debug />
    </div>
  );
};

export default Home;
