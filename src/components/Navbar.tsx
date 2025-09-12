import { Button } from "./ui/button"

function Navbar() {
  return (
    <div className="flex flex-col w-100 items-center justify-center p-4 bg-gray-100 space-y-4">
      <Button variant="default">Home</Button>
      <Button variant="destructive">Home</Button>
      <Button variant="outline">Home</Button>
      <Button variant="secondary">Home</Button>
      <Button variant="ghost">Home</Button>
    </div>
  )
}

export default Navbar