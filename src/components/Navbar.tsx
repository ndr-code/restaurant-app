function Navbar() {
  return (
    <div className="sticky-top flex flex-row justify-between bg-gray-200 text-primary-foreground p-4 bg-primary-100">
      <div>
        Foody
      </div>
      <div className="flex flex-row gap-4">
        <div>
          Cart
        </div>
        <div>
          Avatar
        </div>
        <div>
          Username
        </div>
      </div>
    </div>
  )
}

export default Navbar