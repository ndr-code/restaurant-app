function Navbar() {
  return (
    <div className='display-md-extrabold text-foreground bg-background flex flex-row justify-between p-4'>
      <div>Foody</div>
      <div className='flex flex-row gap-4'>
        <div>Cart</div>
        <div>Avatar</div>
        <div>Username</div>
      </div>
    </div>
  );
}

export default Navbar;
