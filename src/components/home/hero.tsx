import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Hero() {

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex items-center relative w-full h-100 overflow-hidden px-50 ">
        <div className="flex flex-col gap-5">
          <p className="italic">EzRent</p>
          <div>
            <h1 className="font-bold text-5xl tracking-wide">Search, Book and <br/> rent a vehicle easily</h1>
            <p className="mt-2 text-base tracking-wide">Get a car wherever and whenever you need it</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Link to="/vehicles">
              <Button className="px-10 cursor-pointer">Book now</Button>
            </Link>
          </div>
        </div>

        <img src="car1.png" alt="car" className="transform -scale-x-100 absolute w-200 -right-60"/>
      </div>
      <div className="flex justify-between px-5 py-3 border shadow-md w-[90%] rounded-md mt-10 bg-contain">
        <img src="logoipsum-213.png" alt="logoupsum" className="w-40 h-12 object-contain" />
        <img src="logoipsum-216.png" alt="logoupsum" className="w-40 h-12 object-contain" />
        <img src="logoipsum-217.png" alt="logoupsum" className="w-40 h-12 object-contain" />
        <img src="logoipsum-235.png" alt="logoupsum" className="w-40 h-12 object-contain" />
        <img src="logoipsum-263.png" alt="logoupsum" className="w-40 h-12 object-contain" />
       </div>
    </div>
  )
}