function Hero() {
  return (
    <div
      className='relative p-8 shadow-lg flex flex-col items-center justify-center space-y-4 min-h-screen bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <div className='absolute inset-0 bg-black/60'></div>

      <div className='relative z-10'>
        <h1 className='text-white text-center text-2xl font-extrabold'>
          Explore Culinary Experiences
        </h1>
        <p className='text-white text-center text-lg'>
          Search and refine your choice to discover the perfect restaurant.
        </p>
      </div>
    </div>
  );
}

export default Hero;
