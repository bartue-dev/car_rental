import Hero from "@/components/hero";
import Vehicles from "@/components/vehicles";

function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10">
        <Hero />
      </div>
      <div>
        <Vehicles />
      </div>
    </div>
  )
}

export default Home;