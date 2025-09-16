import React from 'react';
import Navbar from '../components/layout/navbar';
import Hero from '../components/home/hero';
import Footer from '../components/layout/footer';

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
