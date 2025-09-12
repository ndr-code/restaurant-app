function Hero() {
  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-center space-y-4 bg-cover bg-center bg-no-repeat p-8 shadow-lg'
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <div className='absolute inset-0 bg-black/60'></div>

      <div className='relative z-10'>
        <h1 className='display-2xl-extrabold mb-2 text-center text-neutral-50'>
          Explore Culinary Experiences
        </h1>
        <p className='display-xs-bold text-neutral-50'>
          Search and refine your choice to discover the perfect restaurant.
        </p>
      </div>
    </div>
  );
}

export default Hero;
