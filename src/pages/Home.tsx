import React from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/home/hero';
import Footer from '@/components/layout/footer';
import HomeMenu from '@/components/home/home-menu';
import Recommended from '@/components/home/recommended';

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
