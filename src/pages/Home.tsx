import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

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
