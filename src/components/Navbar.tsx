function Navbar() {
  return (
    <nav className='bg-background/50 border-border/50 backdrop-blur-2xs fixed top-0 right-0 left-0 z-50 border-b'>
      <div className='display-md-extrabold text-foreground mx-auto flex max-w-7xl flex-row justify-between p-4'>
        <div className='text-foreground font-bold'>Foody</div>
        <div className='flex flex-row items-center gap-4'>
          <div className='hover:text-primary cursor-pointer transition-colors'>
            Cart
          </div>
          <div className='hover:text-primary cursor-pointer transition-colors'>
            Avatar
          </div>
          <div className='hover:text-primary cursor-pointer transition-colors'>
            Username
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
