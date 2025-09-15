import Hero from "@/components/home/hero"
import HomeTestimonials from "@/components/home/home-testimonials"
import Vehicles from "@/components/home/vehicles"

export default function Home() {

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10">
        <Hero/>
      </div>

      <div>
        <Vehicles/>  
      </div>  

      <div>
        <HomeTestimonials/>
      </div>
    </div>
  )
}