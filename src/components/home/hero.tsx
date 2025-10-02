import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Hero() {

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* hero */}
      <div 
        className="flex items-center relative w-full h-80 md:h-100 overflow-hidden px-10 lg:px-20 xl:px-50"
        >
        <div className="flex flex-col gap-5">
          <p className="italic text-sm md:text-base">EzRent</p>
          <div>
            <h1 
              className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-wide"
            >
              Search, Book and <br/> rent a vehicle easily
            </h1>
            <p className="mt-2 text-xs md:text-sm lg:text-base tracking-wide">
              Get a car wherever and whenever you need it
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Link to="/vehicles">
              <Button className="px-6 text-xs md:text-sm md:px-10 cursor-pointer ">Book now</Button>
            </Link>
          </div>
        </div>

        <img 
          src="car1.png" 
          alt="car" 
          className="transform -scale-x-100 absolute w-140 md:w-160 lg:w-190 xl:w-200 -right-60"
        />
      </div>
      {/* logos */}
      <div 
        className="flex flex-wrap justify-center gap-3 md:gap-5 px-2 md:px-3 lg:px-5 py-2 lg:py-3 border shadow-sm rounded-md mt-10 bg-contain bg-white"
      >
        <img src="logoipsum-213.png" alt="logoupsum" className="w-24 md:w-30 lg:w-40 h-12 object-contain" />
        <img src="logoipsum-216.png" alt="logoupsum" className="w-24 md:w-30 lg:w-40 h-12 object-contain" />
        <img src="logoipsum-217.png" alt="logoupsum" className="w-24 md:w-30 lg:w-40 h-12 object-contain" />
        <img src="logoipsum-235.png" alt="logoupsum" className="w-24 md:w-30 lg:w-40 h-12 object-contain" />
        <img src="logoipsum-263.png" alt="logoupsum" className="w-24 md:w-30 lg:w-40 h-12 object-contain" />
       </div>
    </div>
  )
}