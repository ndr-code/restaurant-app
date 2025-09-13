function Hero() {
  return (
    <div
      className='relative flex h-screen flex-col items-center justify-center space-y-4 bg-cover bg-center bg-no-repeat p-8 pt-20 shadow-lg'
      style={{ backgroundImage: "url('/images/hero-background.png')" }}
    >
      <div className='absolute inset-0 h-full bg-black/60'></div>

      <div className='relative z-10 text-center'>
        <h1 className='display-2xl-extrabold mb-6 text-neutral-50'>
          Explore Culinary Experiences
        </h1>
        <p className='display-xs-bold mb-8 text-neutral-50'>
          Search and refine your choice to discover the perfect restaurant.
        </p>

        {/* Optional: Add a search bar or CTA button */}
        <div className='flex justify-center'>
          <button className='bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg px-8 py-3 font-semibold transition-colors'>
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
