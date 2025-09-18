import React from 'react';
import Hero from '@/components/home/hero';
import HomeMenu from '@/components/home/home-menu';
import Recommended from '@/components/home/recommended';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const Home: React.FC = () => {
  return (
    <div className='relative bg-neutral-50'>
      <Navbar />
      <Hero />
      <HomeMenu />
      <Recommended />
      <Footer />
    </div>
  );
};

export default Home;
