import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  return (
    <div className='relative'>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
