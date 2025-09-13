import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <div className='relative'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
